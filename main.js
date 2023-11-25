const allCategory = () => {
    fetch("https://openapi.programming-hero.com/api/videos/category/1000")
    .then(res => res.json())
    .then((data) => {
        displayclean();
        displayitems(data.data, "1000")
    });
    
}

const music = () => {
    fetch("https://openapi.programming-hero.com/api/videos/category/1001")
    .then(res => res.json())
    .then((data) => {
        displayclean();
        displayitems(data.data, "1001")
    });

}
const comedy = () => {
    const itemContainer = document.getElementById("item-container");
    fetch("https://openapi.programming-hero.com/api/videos/category/1003")
    .then(res => res.json())
    .then((data) => {
        displayclean();
        displayitems(data.data, "1003")
    });
}
const drawing = () => {
    displayclean();
    const itemContainer = document.getElementById("item-container");
    fetch("https://openapi.programming-hero.com/api/videos/category/1005")
    .then(res => res.json())
    .then((data) => {
        if(data.status == false)
        {
            const noItem = document.createElement("div");
            noItem.classList.add("no-content");
            noItem.innerHTML=`
            <img src="images/icon.png" alt="">
            <h1>Opps !! There is no</h1>
            <h1>content here</h1>
            `;
            itemContainer.appendChild(noItem);
        }
        else{
            displayclean();
            displayitems(data.data, "1005")
        }
    });
}

const displayitems = (items,id) =>{
    console.log(items);
    const itemContainer = document.getElementById("item-container");
    const setId = document.getElementById("category-id");
    setId.innerHTML = id;

    items.forEach(item => {
        console.log(item);
        let uploadTime = "";
        if (item.others.posted_date != "")
        {
            uploadTime = displaytime(item.others.posted_date);
        }
        
        console.log(uploadTime);
        const card = document.createElement("div");
        card.classList.add("itemcard");
        card.innerHTML=`
        <div class="card m-3" style="width: 18rem; height: 22rem ">
            <div class = "thum-pic">
                <img class="tube-thum" src=${item.thumbnail} class="card-img" alt="...">
                <div class="time-text">
                    <p class="card-text"><small class="text-body-secondary">${uploadTime}</small></p>
                </div>
            </div>
            <div class="card-body">
                <div class="d-flex">
                    <div style = "width:100px">
                        <img src=${item.authors[0].profile_picture} class="card-pro-img" alt="...">
                    </div>
                    <div>
                        <div>
                            <p class="card-title">${item.title}</p>
                        </div>
                        <div class = "d-flex gap-2">
                            <div>
                            <p class="card-text">${item.authors[0].profile_name}</p>
                            </div>

                            <div>
                            ${(item.authors[0].verified) ? ` <img src="images/check1.png" class="varify " style="width:15px; height:15px;" alt="...">`: ""}
                            </div>
                        </div>
                        <div>
                            <p class="card-text"><small class="text-body-secondary"> Views: ${item.others.views}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
        itemContainer.appendChild(card);
    });
}

const sort = () =>{
    const id = document.getElementById("category-id").innerHTML;

    fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`)
    .then(res => res.json())
    .then((data) => {
        const sortData = data.data.sort(function(a,b) {return parseInt(b.others.views) - parseInt(a.others.views)});
        displayclean();
        displayitems(sortData);
    });

}

const displayclean = () => 
{
    const itemContainer = document.getElementById("item-container");
    itemContainer.innerHTML = "";
}

const displaytime = (second) =>
{
    var second = parseInt(second);

    var day = Math.floor(second / (3600*24 *1000));
    second -= day * 24 * 3600 * 1000;

    var hour = Math.floor(second / (3600 * 24));
    second -= hour * 3600 * 24;

    var minute = Math.floor(second / 3600);
    second -= minute * 3600;

    return (day + " d " + hour + " hr " + minute + " min ");
}
allCategory()