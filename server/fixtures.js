if (Posts.find().count() === 0) {
    Posts.insert({
        title: "中华人民共和国站起来了",
        url: "http://www.pinor.net/index.html"
    });
}

if (AccessToken.find().count() === 0) {
    AccessToken.insert({
        access_token: "0",
        expires_in: "0"
    });
}
