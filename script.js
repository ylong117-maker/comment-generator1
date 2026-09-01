let currentCategory = "";

let lastIndex = -1;

// =========================
// 分类对应关系
// =========================

const categoryMap = {
    "啤酒": "beer",
    "果酒": "fruitWine",
    "米酒": "riceWine",
    "白酒": "baijiu",
    "梅酒": "plumWine",
    "门店": "store"
};


// =========================
// 当前分类连续生成次数
// =========================

let generateCount = 0;


// =========================
// 点击分类按钮
// =========================

function selectCategory(category) {

    // 记录当前选择的分类
    currentCategory = category;

    // 清空之前的评论
    const result = document.getElementById("result");

    if (result) {
        result.value = "";
    }

    // 找到所有分类按钮
    const buttons = document.querySelectorAll(".keyword");

    // 先取消所有按钮的选中状态
    buttons.forEach(function(button) {

        button.classList.remove("active");

    });


    // 根据按钮文字找到当前按钮
    buttons.forEach(function(button) {

        if (button.innerText.trim() === category) {

            button.classList.add("active");

        }

    });


    // 换分类以后，重新允许随机
    lastIndex = -1;

    // 换分类以后，重新计算连续生成次数
    generateCount = 0;

}


// =========================
// 随机生成评论
// =========================

function generateComment() {

    // 没有选择分类
    if (currentCategory === "") {

        alert("请先选择评论分类");

        return;

    }


    // =========================
    // 连续生成次数 +1
    // =========================

    generateCount++;


    // =========================
    // 第10次的时候幽默提醒
    // =========================

    if (generateCount === 10) {

        alert("别再点啦！评论都快被你薅秃了 😂 (￣▽￣)ノ");

    }


    // =========================
    // 超过10次以后偶尔提醒
    // =========================

    if (generateCount > 10 && generateCount % 10 === 0) {

        alert("还在点呢？这类评论真的快被你抽完啦 😂 (╯°□°）╯");

    }


    // =========================
    // 获取真正的分类 key
    // =========================

    const categoryKey = categoryMap[currentCategory];


    // 获取当前分类的评论
    const list = comments[categoryKey];


    // 分类不存在或者没有评论
    if (!list || list.length === 0) {

        alert("该分类暂时没有内容");

        return;

    }


    let index;


    // 如果只有一条评论
    if (list.length === 1) {

        index = 0;

    }


    // 如果有多条评论
    else {

        // 避免连续两次出现同一条
        do {

            index = Math.floor(
                Math.random() * list.length
            );

        } while (index === lastIndex);

    }


    // 记录这次使用的评论
    lastIndex = index;


    // 显示评论
    const result = document.getElementById("result");

    if (result) {

        result.value = list[index];

    }

}


// =========================
// 一键复制
// =========================

async function copyComment() {

    // 获取当前评论
    const textarea = document.getElementById("result");

    if (!textarea) {

        alert("找不到评论输入框");

        return;

    }


    const text = textarea.value.trim();


    // 没有评论
    if (!text) {

        alert("请先生成评论");

        return;

    }


    // =========================
    // 优先使用现代复制方式
    // =========================

    try {

        await navigator.clipboard.writeText(text);

        alert("评论已复制，可以粘贴使用");

    }


    // =========================
    // 备用复制方式
    // =========================

    catch (error) {

        textarea.focus();

        textarea.select();

        textarea.setSelectionRange(
            0,
            textarea.value.length
        );


        try {

            document.execCommand("copy");

            alert("评论已复制，可以粘贴使用");

        }

        catch (error) {

            alert("复制失败，请手动复制");

        }

    }

}