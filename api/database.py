from sqlmodel import create_engine, SQLModel, Session, select
import api.config as config

engine = create_engine(config.db_string)

def update_tables():
    # loads models
    SQLModel.metadata.create_all(engine)

# adds a default admin account if its not already there
def create_admin():
    from api.models.user_models import User # avoids circular imports
    from api.models.misc_models import Banner
    with Session(engine) as session:
        admin = session.exec(select(User).where(User.username == config.admin_username)).first()
        if not admin:
            admin = User(username=config.admin_username, password=config.admin_password, admin=True)
            admin.hash_password()
            session.add(admin)
            session.commit()

        banner = session.exec(select(Banner)).first()
        if not banner:
            banner = Banner(
                message="Hello, world!",
                show=False
            )
            session.add(banner)
            session.commit()


def get_session():
    with Session(engine) as session:
        yield session