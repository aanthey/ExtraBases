from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os
from typing import Optional
import pandas as pd

try:
    from pybaseball import playerid_lookup
except Exception as e:
    # If pybaseball isn't installed or import fails, raise a clear error when endpoint is called
    playerid_lookup = None

app = FastAPI(title="pybaseball service")

# Configure allowed origins via environment variable `ALLOWED_ORIGINS` (comma-separated)
# Example: ALLOWED_ORIGINS="http://localhost:3000,https://my-codespace-3000.app.github.dev"
allowed = os.environ.get("ALLOWED_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000")
if allowed.strip() == "*":
    allow_list = ["*"]
else:
    allow_list = [o.strip() for o in allowed.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def _row_to_json(row: pd.Series) -> dict:
    out = {}
    for k, v in row.items():
        if pd.isna(v):
            out[k] = None
        elif isinstance(v, (pd.Timestamp,)):
            out[k] = str(v)
        else:
            try:
                # convert numpy types
                out[k] = v.item() if hasattr(v, "item") else v
            except Exception:
                out[k] = v
    return out


@app.get("/player")
def get_player(first: str, last: str, return_first_match: Optional[bool] = True):
    """Lookup player by first+last name using pybaseball.playerid_lookup.

    Returns the first matching player row as JSON and a suggested image URL (constructed from mlbam id when available).
    """
    if playerid_lookup is None:
        raise HTTPException(status_code=500, detail="pybaseball not available; install requirements.txt and try again")

    try:
        df = playerid_lookup(last, first)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    if df is None or df.empty:
        raise HTTPException(status_code=404, detail="Player not found")

    # choose either the first match or return all
    row = df.iloc[0] if return_first_match else df

    if isinstance(row, pd.DataFrame):
        return row.to_dict(orient="records")

    data = _row_to_json(row)

    # common column names for mlb id in pybaseball lookup: 'key_mlbam' or 'key_mlbam'
    mlbam = data.get("key_mlbam") or data.get("key_mlbam_id") or data.get("mlbam_id") or data.get("player_id")

    # Construct a suggested headshot URL (may vary across sources); include it so frontend can try to display.
    image_url = None
    if mlbam:
        try:
            image_url = f"https://img.mlbstatic.com/mlb-photos/image/upload/w_300,h_300,c_fill,g_faces:center/people/{int(mlbam)}.jpg"
        except Exception:
            image_url = None

    data["image_url"] = image_url

    return data
