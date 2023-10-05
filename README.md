# Code Journal

My personal blog: <https://sufimalek.github.io>, welcome Star and Fork.

Personal blog, wiki, projects, snippets. continuosly improving and adding new tech stack to it including devops part

## Overview

<!-- vim-markdown-toc GFM -->

* [Effect Preview](#effect-preview)
* [Fork Guide](#fork-guide)
* [Use Documentation](#use-documentation)
* [Experience and Thoughts](#experience-and-thoughts)
* [Contact me](#contact-me)
* [Acknowledgement](#acknowledgments)

<!-- vim-markdown-toc -->

## Effect preview

**[Online preview &rarr;](https://sufimalek.github.io)**

<!-- ![screenshot home](https://mazhuang.org/assets/images/screenshots/home.png) -->

## Fork Guide

After Forking this project, there are still some things you need to do to make your page run "correctly".

1. Set the project name and branch correctly.

    According to the provisions of GitHub Pages, the master branch of the project named `username.github.io` or the gh-pages branch of the project with other names can automatically generate GitHub Pages pages.

2. Modify the domain name.

    If you need to bind your own domain name, modify the contents of the CNAME file and refer to [Configuring a custom domain for the GitHub Pages site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) and configure it; if you do not need to bind your own domain name, delete the CNAME file.

3. Modify the configuration.

    The configuration of the website is basically concentrated in the \_config.yml file. Replace the parts related to personal information with your own, such as the website's url, title, subtitle, and third-party comment module configuration.

    **Comment module:** Currently supports disqus, gitment, gitalk, utterances, beaudar and giscus. Just choose one of them. It is recommended to use giscus. Their respective official configuration guide links are posted in the Comments section of the \_config.yml file. Please refer to the official guide configuration.

    **Note:** If you use disqus, please be sure to modify disqus.username to your own because of the flaws in disqus's strategy for processing usernames and domain name whitelists, otherwise please leave this field blank.

4. Delete my articles and pictures.

    You can delete all except the template.md file in the following folder, and then add your own content.

    * In the `\_posts` folder are my published blog posts.
    * Inside the `\_drafts` folder are my unpublished blog posts.
    * In the `\_wiki` folder are my published wiki pages.
    * The `\_fragments` folder contains short article fragments that I have published.
    *The images folder contains the images used in my articles and pages.

5. Modify the "About" page.

    The content of the pages/about.md file corresponds to the "About" page of the website. The content inside is mostly personal-related. Replace them with your own information, including the data in the `skills.yml` and `social.yml` files in the `\_data` directory.


## Use documentation

- To preview the blog effect locally, please refer to [Setting up your Pages site locally with Jekyll][2].

## Experience and Thoughts

* It is recommended that typesetting follow certain standards.

* Simplicity, try not to display redundant content on each page.

* Sometimes a picture is worth a thousand words, sometimes it may just slow down the page loading speed.

*Speak with substance and don’t make painless moans.

* If you are writing a technical article, first fully clarify the technical principles before starting to write. It is inefficient to organize the article while exploring the technology.

* Avoid long sentences that are difficult to break up and understand. If you cannot split them into several concise sentences, it means that the understanding in your mind is not clear.

* You can learn from those high-quality bloggers, their writing, content organization, and what is worth learning from.

## contact me

If you have any suggestions about the template or content of this blog, you can contact me through [Issues](https://github.com/sufimalek/sufimalek.github.io/issues).


## Acknowledgments

The appearance of this blog is modified based on [DONGChuan](https://dongchuan.github.io), thank you!

[2]: https://help.github.com/articles/setting-up-your-pages-site-locally-with-jekyll/

[1]: mzlogin

## command to run

local
bundle exec jekyll serve --config _config.yml,_config_secret.yml

## Newsletter

Implemented firestore to save email data    
used github secret keys to save secret keys and environment keys

## next in bucket
worker script