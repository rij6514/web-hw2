// ===== Part A =====

const averageA = (list) => {
    let sum = 0;
    for(const m of list) {
        sum += m.rating;
    }
    return sum / list.length;
}
console.log("A1 평균 평점: " + averageA(moviesA))

const bestA = (list) => {
    let maxA = 0;
    for(let i = 0; i < list.length; i++) {
        if(list[maxA] < list[i].average) {
            maxA = i;
        }
    }
    console.log("A2 최고 평점: " + list[maxA].title + " " + list[maxA].rating);   
}
bestA(moviesA);

const filterByRatingA = (list, min) => {
        return list.filter(m => m.rating >= min);
}
console.log("A3 8점 이상: " + filterByRatingA(moviesA, 8).length + "편");

const sortByYearA = (list) => {
    let decadelist ={
        "2020" : 0,
        "2010" : 0,
        "2000" : 0,
        "1900" : 0
    };
    for (let i = 0; i < list.length; i++) {
        const decade = list[i].year - (list[i].year % 10);
        switch (decade) {
            case 2020 :
                decadelist[2020]++;
                break;
            case 2010 :
                decadelist[2010]++;
                break;
            case 2000 :
                decadelist[2000]++;
                break;
            default:
                decadelist[1900]++;
        }
    }
    console.log("A4 2020년대 " + decadelist[2020] + "편, 2010년대 " + decadelist[2010] + "편, 2000년대 " + decadelist[2000] + "편, 그 이전 " + decadelist[1900] + "편");
}
sortByYearA(moviesA);

const filterByAdA = (list) => {
    let bigA = "";
    for(const m of list) {
        if(m.audiences >= 1000000) {
            bigA = bigA + m.title + " ";
        }
    }
    if(bigA === "") {
        bigA = "없음";
    }
    return bigA;
}
console.log("A5 관객 100만 이상: " + filterByAdA(moviesA));

// ===== Part B =====

//영화 배열 ⇒ 평균 평점(숫자)
const average = (list) => {
    let sum = 0;
    for(const m of list) {
        sum += m.rating;
    }
    return sum / list.length;
}

//영화 배열 ⇒ 평점이 가장 높은 영화 객체
const best = (list) => {
    let max = 0;
    for(let i = 0; i < list.length; i++) {
        if(list[max] < list[i].average) {
            max = i;
        }
    }
    return list[max];
}

//영화 배열, 최소 평점 ⇒ 그 이상인 영화만 담은 새 배열
const filterByRating = (list, min) => {
        return list.filter(m => m.rating >= min);
}

// sortBy : 영화 배열, 키 이름, 내림차순 여부 ⇒ 정렬한 새 배열(원본은 그대로)
function sortBy(list, key, desc) {
    const copy = [...list];
    copy.sort((a, b) => {
        if (typeof a[key] === "string") return a[key].localeCompare(b[key]);
        return a[key] - b[key];
    });
    if (desc) copy.reverse();
    return copy;
}

// 배열, 문자열 ⇒ 새 배열
function search(list, keyword) {
    return list.filter(m => m.title.toLowerCase().includes(keyword.trim().toLowerCase()));
}

// 숫자나 숫자 문자열 ⇒ "1,234,567"
function formatNumber(n) {
    return Number(n).toLocaleString("ko-KR")
}

//날짜 문자열 ⇒ 올해까지 몇 년(숫자)
const yearsSince = (dateStr) => {
    return new Date().getFullYear() - new Date(dateStr).getFullYear();
}

const bestMovie = best(movies);

document.getElementById("out").textContent = "전체 " + movies.length + "편, 평균 평점 " + average(movies).toFixed(1) + "점\n" +
    "최고 평점 " + bestMovie.title + "(" + bestMovie.rating + ", 개봉한 지 " + yearsSince(bestMovie.date) + "),\n" +
    "관객 1위 " + sortBy(movies, "audiences", true)[0].title + "(누적" + formatNumber(sortBy(movies, "audiences", true)[0].audiences) + "명)";

// ===== Part C =====

// 응답 객체 => 영화 배열
const getList = (data) => {
    return data.results;
}

// 배열 , 키 이름 => 그 키 값의 평균(숫자)
const averageBy = (list, key) => {
    let sum = 0;
    for(const m of list) {
        sum += m[key];
    }
    return sum / list.length;
}

console.log("C1", "page", TMDB.page, "total_pages", TMDB.total_pages, "total_results", TMDB.total_results, "이번 응답", getList(TMDB).length + "편");
console.log("C2 상영작 평균 평점:", averageBy(getList(TMDB), "vote_average").toFixed(1));
console.log("C3", );
console.table(sortBy(getList(TMDB), "vote_average", true).slice(0,5), ["title", "release_date", "vote_average"]);
console.log("C4 'hunger' 검색:", search(getList(TMDB), "hunger").length + "편")