class DocumentFetchError(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)

class DocumentTableError(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)

class DocumentIncompleteTableError(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)

class SheetFetchError(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)

class SheetUpdateError(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)

class EmptyEventError(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)

class DuplicateEventError(Exception):
    def __init__(self, message):
        self.message = message
        super().__init__(self.message)