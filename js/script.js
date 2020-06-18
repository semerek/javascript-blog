
/* document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
}); */

'use strict';

const titleClickHandler = function(event){
  const clickedElement = this;
  event.preventDefault(); /*prevent from scrolling to another section like Wikipedia*/
  console.log('Link was clicked');


  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks){
  activeLink.classList.remove('active');
}

  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  console.log('clickedElement:', clickedElement);


  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts article.active');
  for (let activeArticle of activeArticles){
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

  const optArticleSelector = '.post',
      optTitleSelector = '.post-title',
      optTitleListSelector = '.titles';

  function generateTitleLinks(){

      /* remove contents of titleList */
      const titleList = document.querySelector(optTitleListSelector);
      titleList.innerHTML = ''; /*wyrażenie z Clear Messages do wyczyszczenia zawartości listy linków*/
      console.log(titleList);
      /*funkcja, która usuwa listę linków po lewej stronie */


      /* for each article */
      const articles = document.querySelector(optArticleSelector);
      let html = ";
      for (let article of articles)
        article.innerHTML = '';
        console.log(articles);

      /* get the article id (odczytanie id artykułu) */
      const articleId = article.getAttribute(id); /*zamiast article mogłabym użyć też optArticleSelector? */
      console.log(articleId);

      /* find the title element (odczytanie tytułu artykułu) */
      /* get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log(articleTitle)
      /* jaką funkcję pełni tutaj .innerHTML?  */

      /* create HTML of the link */
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log(linkHTML);

      /* insert link into titleList */
      html = html + linkHTML;

    }
  titleList.innerHTML = html;
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
