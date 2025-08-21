from sqlmodel import create_engine, SQLModel, Session, select
import backend.config as config

engine = create_engine("sqlite:///db.sqlite3")

def update_tables():
    from backend.models import User, Event, RefreshJTI
    SQLModel.metadata.create_all(engine)

# adds a default admin account if its not already there
def create_admin():
    from backend.models import User # avoids circular imports
    with Session(engine) as session:
        result = session.exec(select(User).where(User.username == config.admin_username)).first()
        if not result:
            admin = User(username=config.admin_username, password=config.admin_password, admin=True)
            admin.hash_password()
            session.add(admin)
            session.commit()

def get_session():
    from backend.models import Session # avoids circular imports
    with Session(engine) as session:
        yield session