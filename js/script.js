const galleryContent = document.querySelector(".gallery__content");
let currentDetailBox = null;

async function getData() {
  try {
    const response = await fetch("/data/data.json");
    if (!response.ok) {
      throw new Error("Fetching data failed");
    }
    return response.json();
  } catch (error) {
    console.error("Fetching data failed", error);
  }
}

async function createElement() {
  const data = await getData();
  if (!data) return;

  data.forEach((item, index) => {
    const img = document.createElement("img");
    const p = document.createElement("p");
    const view = document.createElement("span");
    const date = document.createElement("span");
    const itemBox = document.createElement("div");
    const boxImg = document.createElement("div");
    const boxFooter = document.createElement("div");

    img.setAttribute("src", item.image);
    p.textContent = item.title;
    view.textContent = item.views + " views";
    date.textContent = item.date;

    boxFooter.append(view);
    boxFooter.append(date);
    boxImg.append(img);
    boxImg.append(p);
    itemBox.append(boxImg);
    itemBox.append(boxFooter);
    galleryContent.append(itemBox);

    itemBox.classList.add("item");
    boxImg.classList.add("img", "loader");
    boxImg.style.cursor = "pointer";
    boxFooter.classList.add("title");
    view.style.opacity = 0;
    date.style.opacity = 0;

    img.addEventListener("load", () => {
      boxImg.classList.remove("loader");
      view.style.opacity = 1;
      date.style.opacity = 1;
    });

    boxImg.addEventListener("click", () => showImageItem(item));
  });

  galleryContent.addEventListener("click", (e) => {
    const target = e.target;
    const itemIndex = target.closest(".item")?.dataset.itemIndex;

    if (itemIndex !== undefined) {
      const item = data[itemIndex];
      showImageItem(item);
    }
  });
}

createElement();

function showImageItem(item) {
  if (currentDetailBox) {
    currentDetailBox.classList.add("closed");
    currentDetailBox.remove();
  }
  const detailBox = createDetailBox(item);
  document.body.append(detailBox);
  currentDetailBox = detailBox;
}

function createDetailBox(item) {
  const detailBox = document.createElement("div");
  const img = document.createElement("img");
  const itemBox = document.createElement("div");
  const boxImg = document.createElement("div");

  img.setAttribute("src", item.image);
  detailBox.classList.add("detail__box");
  boxImg.append(img);
  detailBox.append(boxImg);

  detailBox.addEventListener("click", () => {
    detailBox.classList.add("closed");
    detailBox.remove();
  });

  return detailBox;
}
