import pytest
from app import app


@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


def test_movies_endpoint_returns_200(client):
    response = client.get("/movies")
    assert response.status_code == 200


def test_movies_endpoint_returns_json(client):
    response = client.get("/movies")
    assert response.content_type == "application/json"


def test_movies_endpoint_returns_valid_data(client):
    response = client.get("/movies")
    data = response.get_json()
    assert "movies" in data
    assert len(data["movies"]) == 3
    assert data["movies"][0]["title"] == "Top Gun: Maverick"
    assert data["movies"][1]["title"] == "Sonic the Hedgehog"
    assert data["movies"][2]["title"] == "A Quiet Place"
