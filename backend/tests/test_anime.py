import pytest


@pytest.mark.asyncio
async def test_search_anime_monkeypatched(client, monkeypatch):
    sample = [
        {
            'mal_id': 123,
            'title': 'Test Anime',
            'synopsis': 'Test synopsis',
            'episodes': 12,
            'score': 7.5,
            'images': {'jpg': {'image_url': 'http://example.com/img.jpg'}}
        }
    ]

    async def fake_search(q, page=1):
        return sample

    # monkeypatch the jikan search function
    monkeypatch.setattr('app.services.jikan.search_anime', fake_search)

    res = client.get('/anime/search?q=test')
    assert res.status_code == 200
    data = res.json()
    assert isinstance(data, list)
    assert data[0]['id'] == 123
    assert data[0]['title'] == 'Test Anime'
