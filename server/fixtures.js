if (AccessToken.find().count() === 0) {
    AccessToken.insert({
        tokenName: "weixin"
    });
}
