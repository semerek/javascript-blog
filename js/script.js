/* document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
}); */
{
  'use strict';

  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = 5,
    optCloudClassPrefix = 'tag-size-',
    optAuthorsListSelector = '.authors.list';



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

  }


  function generateTitleLinks(customSelector = '') {

    /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = ''; /*wyrażenie z Clear Messages do wyczyszczenia zawartości listy linków*/
    console.log(titleList);
    /*funkcja, która usuwa listę linków po lewej stronie */

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
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



  function generateTags() {
    console.log('Tag was generated');

    /* [NEW] create a new variable allTags with an empty array */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);
      console.log(tagsWrapper);

      /* make html variable with empty string */
      let html = '';
      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTagsArray);

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        console.log(tag);

        /* generate HTML of the link */
        const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '  ' + '</span></a></li> ';
        console.log(linkHTML);

        /* add generated code to html variable */
        html = html + linkHTML;
        console.log(html);
        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags[tag]) {
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }

        /* END LOOP: for each tag */
      }

      /* insert HTML of all the links into the tags wrapper */
      tagsWrapper.innerHTML = html;

      /* END LOOP: for every article: */
    }
    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');
    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    console.log('tagsParams:', tagsParams)
    let allTagsHTML = '';

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
      const tagLinkHTML = calculateTagClass(allTags[tag], tagsParams);

      allTagsHTML += '<li><a class="tag-size-' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ')</a></li>'
      console.log('all tags html', allTagsHTML);

    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    tagList.innerHTML = allTagsHTML;


    // znajdowanie ilości występowania tagów

    function calculateTagsParams(tags) {
      const params = { max: 0, min: 999999 };

      for (let tag in tags) {
        params.max = Math.max(tags[tag], params.max);
        params.min = Math.min(tags[tag], params.min);
        console.log(tag + ' is used ' + tags[tag] + ' times');
      }

      return params;
    }

    // obliczanie klas po ich ilości występowania

    function calculateTagClass(count, params) {
      const normalizedCount = count - params.min;
      const normalizedMax = params.max - params.min;
      const percentage = normalizedCount / normalizedMax;
      const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

      return optCloudClassPrefix + classNumber;
    }

  }


  function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');

    /* find all tag links with class active */
    const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log('activeTagLinks', activeTagLinks, href)

    /* START LOOP: for each active tag link */
    for (let activeTagLink of activeTagLinks) {

      /* remove class active */
      activeTagLink.classList.remove('active');


      /* END LOOP: for each active tag link */

    }
    clickedElement.classList.add('active');


    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {

      /* add class active */
      tagLink.classList.add('active');

      /* END LOOP: for each found tag link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */

  }

  function addClickListenersToTags() {
    /* find all links to tags */
    const tags = document.querySelectorAll('a[href^="#tag-"]');
    console.log(tags);

    /* START LOOP: for each link */
    for (let link of tags) {

      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', tagClickHandler);

      /* END LOOP: for each link */
    }
  }




  function generateAuthors() {
    console.log('Author link was generated');

    let allAuthors = {};

    /* find all articles*/
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);

    /*Start loop for each article*/
    for (let article of articles) {

      /*find author wrapper*/
      const authorWrapper = article.querySelector(optArticleAuthorSelector);
      console.log(authorWrapper);

      /* make html variable with empty string */
      let html = '';
      /* get name of the author from data-authors attribute */
      const articleAuthor = article.getAttribute('data-author');
      console.log(articleAuthor);

      /* generate HTML of the link */
      const linkHTML = '<p><a href="#author' + articleAuthor + '"><span>' + articleAuthor + ' ' + '</span</a></p>';

      console.log(linkHTML);

      /* add generated code to html variable */
      html = html + linkHTML;
      console.log('', html)
      if (!allAuthors[articleAuthor]) {
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }

      /* [NEW] find list of tags in right column */
      const authorList = document.querySelector('.authors');
      /* [NEW] create variable for all links HTML code */
      const authorsParams = calculateAuthorsParams(allAuthors);
      console.log('authorsParams:', authorsParams)
      let allAuthorsHTML = '';

      for (let articleAuthor in allAuthors) {
        const authorLinkHTML = calculateAuthorClass(allAuthors[articleAuthor], authorsParams);
        allAuthorsHTML += '<li><a class="' + calculateAuthorClass(allAuthors[articleAuthor], authorsParams) + '" href="#author-' + articleAuthor + '">' + articleAuthor + ' </a> (' + allAuthors[articleAuthor] + ')' + '</li>';

      }

      authorWrapper.innerHTML = html;
    }

    function calculateAuthorsParams(authors) {
      const params = { max: 0, min: 999999 };

      for (let author in authors) {
        params.max = Math.max(authors[author], params.max);
        params.min = Math.min(authors[author], params.min);
        console.log(author + ' is used ' + authors[author] + ' times');
      }

      return params;
    }

    function calculateAuthorClass(count, params) {
      const normalizedCount = count - params.min;
      const normalizedMax = params.max - params.min;
      const percentage = normalizedCount / normalizedMax;
      const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

      return optCloudClassPrefix + classNumber;
    }

  }


  function authorClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    let clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "author" and extract author from the "href" constant */
    const author = href.replace('#author', '');

    /* find all author links with class active */
    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author"]');

    /* START LOOP: for each active author link */
    for (let activeAuthorLink of activeAuthorLinks) {

      /* remove class active */
      activeAuthorLink.classList.remove('active');

      /* END LOOP: for each active author link */
    }

    /* find all author links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found author link */
    for (let authorLink of authorLinks) {

      /* add class active */
      authorLink.classList.add('active');

      /* END LOOP: for each found author link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');

  }

  function addClickListenersToAuthors() {
    /* find all links to author */
    const links = document.querySelectorAll('a[href^="#author"]');

    /* START LOOP: for each link */
    for (let link of links) {

      /* add tagClickHandler as event listener for that link */
      link.addEventListener('click', authorClickHandler);

      /* END LOOP: for each link */
    }
  }
  generateTitleLinks();
  generateTags();
  addClickListenersToTags();
  generateAuthors();
  addClickListenersToAuthors();

}
