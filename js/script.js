
/* document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
}); */
{
  'use strict';

  const titleClickHandler = function (event) {
    const clickedElement = this;
    event.preventDefault(); /*prevent from scrolling to another section like Wikipedia*/
    console.log('Link was clicked');


    /* remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll('.titles a.active');
    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* add class 'active' to the clicked link */
    clickedElement.classList.add('active');
    console.log('clickedElement:', clickedElement);


    /* remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll('.posts article.active');
    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /* get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    /* find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /* add class 'active' to the correct article */
    targetArticle.classList.add('active');

  };

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles';

  function generateTitleLinks() {

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = ''; /*wyrażenie z Clear Messages do wyczyszczenia zawartości listy linków*/
    console.log(titleList);
    /*funkcja, która usuwa listę linków po lewej stronie */

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log('articles', articles);
    let html = '';

    for (let article of articles) {
      /* get the article id (odczytanie id artykułu) */
      const articleId = article.getAttribute('id'); /*zamiast article mogłabym użyć też optArticleSelector? */
      console.log(articleId);

      /* find the title element (odczytanie tytułu artykułu) */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log(articleTitle);

      /* get the title from the title element */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);

      /* create HTML of the link */
      titleList.insertAdjacentHTML('afterbegin', linkHTML);

      /* insert link into titleList */
      html = html + linkHTML;
    }

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log(links);

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();
  
}

/*things to explain later
- co dokładnie wykonuje innerHTML?
-  titleList.insertAdjacentHTML('afterbegin', linkHTML); nie do końca rozumiem działanie tej funkcji
- const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>' - nie rozumiem, kiedy użyć podwójnych a kiedy pojedynczego cudzysłowia.
- let html = ''; (dlaczego?)

- */
