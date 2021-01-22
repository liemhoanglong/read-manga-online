var allGenres = [
    {
        id: "5ffbb82936ba3a07f4b669e8",
        name: "Hành động"
    },
    {
        id: "5ffbb85636ba3a07f4b669e9",
        name: "Lịch sử"
    },
    {
        id: "5ffbb85e36ba3a07f4b669ea",
        name: "Phiêu lưu"
    },
    {
        id: "5ffbb86836ba3a07f4b669eb",
        name: "Hài hước"
    },
    {
        id: "5ffbb86f36ba3a07f4b669ec",
        name: "Học đường"
    },
    {
        id: "5ffd6e617eac403c106e630c",
        name: "Thể thao"
    },
    {
        id: "5ffd6e787eac403c106e630d",
        name: "Viễn tưởng"
    },
    {
        id: "5ffd6e8d7eac403c106e630e",
        name: "Kinh dị"
    },
    {
        id: "60029d48ed62883fe489970a",
        name: "Trinh thám"
    },
    {
        id: "6002b273ed62883fe4899713",
        name: "Ẩm thực"
    },
];

var addGenre = function () {
    var select = document.createElement('select');
    select.class = "form-select";
    select.name = "genre";

    allGenres.forEach(genre => {
        var option = document.createElement('option');
        option.value = genre.id;
        option.innerHTML = genre.name;
        select.appendChild(option);
    });

    document.getElementById('genres').appendChild(select);
}

var deleteGenre = function() {
    var genres = document.getElementById('genres');
    genres.removeChild(genres.childNodes[genres.childNodes.length - 1]);
}