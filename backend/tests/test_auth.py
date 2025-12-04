def test_register_and_login(client):
    # register
    res = client.post('/auth/register', json={'email': 't1@example.com', 'password': 'secret'})
    assert res.status_code == 200
    data = res.json()
    assert 'access_token' in data

    # login
    res2 = client.post('/auth/login', json={'email': 't1@example.com', 'password': 'secret'})
    assert res2.status_code == 200
    data2 = res2.json()
    assert 'access_token' in data2
