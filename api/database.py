from sqlmodel import create_engine, SQLModel, Session, select
import api.config as config

engine = create_engine(config.db_string)

def update_tables():
    # loads models
    SQLModel.metadata.create_all(engine)

# adds a default admin account if its not already there
def create_admin():
    from api.models.user_models import User # avoids circular imports
    with Session(engine) as session:
        result = session.exec(select(User).where(User.username == config.admin_username)).first()
        if not result:
            admin = User(username=config.admin_username, password=config.admin_password, admin=True)
            admin.hash_password()
            session.add(admin)
            session.commit()

def get_session():
    with Session(engine) as session:
        yield session