import folder_paths
import hashlib
from server import PromptServer
from aiohttp import web

class InvertImageNode:
    @classmethod
    def INPUT_TYPES(cls):
        return {
            "required": { "image_in" : ("IMAGE", {}) },
        }

    RETURN_TYPES = ("IMAGE",)
    RETURN_NAMES = ("image_out",)
    CATEGORY = "examples"
    FUNCTION = "invert"

    def invert(self, image_in):
        image_out = 1 - image_in
        return (image_out,)


    @classmethod
    def IS_CHANGED(s, image):
        image_path = folder_paths.get_annotated_filepath(image)
        m = hashlib.sha256()
        with open(image_path, 'rb') as f:
            m.update(f.read())
        return m.digest().hex()



# Oppsett av ruten med POST-endepunkt
routes = PromptServer.instance.routes

@routes.post('/my_new_path')
async def my_function(request):
    the_data = await request.post()
    print(f"Received data: {the_data}")
    return web.json_response({"status": "success", "data_received": dict(the_data)})
