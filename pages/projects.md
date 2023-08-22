---
layout: page
title: Projects
description: List of projects
keywords: projects
comments: false
menu: Projects
permalink: /projects/
---

<!-- {{site.projects}} -->
<div class="repo-list">
    <!-- Check here for github metadata -->
    <!-- https://help.github.com/articles/repository-metadata-on-github-pages/ -->
    {% for repo in site.projects %}
    <a href="{{ site.url }}{{ repo.url }}" target="_blank" class="one-third-column card text-center">
        <div class="thumbnail">
            <div class="card-image geopattern" data-pattern-id="{{ repo.name }}">
                <div class="card-image-cell">
                    <h3 class="card-title">
                        {{ repo.title }}
                    </h3>
                </div>
            </div>
            <div class="caption">
                <div class="card-description">
                    <p class="card-text">{{ repo.description }}</p>
                </div>
            </div>
        </div>
    </a>
    {% endfor %}
</div>
