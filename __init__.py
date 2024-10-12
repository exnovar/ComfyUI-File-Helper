from .image_handler import InvertImageNode


WEB_DIRECTORY = "./js"

NODE_CLASS_MAPPINGS = {
    'Example Node': InvertImageNode 
}

__all__ = ["NODE_CLASS_MAPPINGS", "WEB_DIRECTORY"]
