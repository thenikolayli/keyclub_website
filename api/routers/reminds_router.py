from fastapi import APIRouter, Depends, status
from fastapi.responses import JSONResponse
from api.utils.auth_utils import require_admin
from api.utils.reminds_utils import post_event
from api.models.reminds_models import PostEvent

router = APIRouter(prefix="/api/reminds", tags=["reminds"])

'''
features

post an event

check events
'''

@router.post("/post", dependencies=[Depends(require_admin)])
async def post(event: PostEvent):
    try:
        post_event(
            docs_url=event.url,
            event_description=event.description,
            post_type=event.post_type,
        )
    except Exception as e:
        return JSONResponse(str(e), status_code=status.HTTP_400_BAD_REQUEST)
    return JSONResponse("Event posted", status_code=status.HTTP_200_OK)