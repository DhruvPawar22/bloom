import uvicorn

def run():
    uvicorn.run("server.main:app", reload=True)
