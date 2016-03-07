if (Posts.find().count() === 0) {
    Posts.insert({
        title: "中华人民共和国站起来了",
        url: "http://www.pinor.net/index.html"
    });
}
