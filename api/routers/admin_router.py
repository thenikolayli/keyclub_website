from fastapi import APIRouter, status, Depends
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.responses import FileResponse

from utils.auth_utils import require_admin
import config

router = APIRouter(prefix="/admin", tags=["admin"])

# returns the swagger api docs
@router.get("/docs", dependencies=[Depends(require_admin)])
async def docs():
    return get_swagger_ui_html(openapi_url="/openapi.json", title="API Docs")

# returns the goaccess web log
@router.get("/log", dependencies=[Depends(require_admin)])
async def goaccess():
    return FileResponse(config.goaccess_path, status_code=status.HTTP_200_OK)

