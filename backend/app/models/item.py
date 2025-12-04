from pydantic import BaseModel

class Item(BaseModel):
    """
    Pydantic model for an Item.
    Represents the structure of data that will be sent and received.
    """
    id: int
    name: str
    description: str | None = None
