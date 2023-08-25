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
<div class="project-list">
    {% for project in site.projects %}
    <a href="{{ site.url }}{{ project.url }}" target="_blank" class="one-third-column card text-center">
        <div class="thumbnail">
            <div class="card-image geopattern" data-pattern-id="{{ project.name }}">
                <div class="card-image-cell">
                    <h3 class="card-title">
                        {{ project.title }}
                    </h3>
                </div>
            </div>
            <div class="caption">
                <div class="card-description">
                    <p class="card-text">{{ project.description }}</p>
                </div>
            </div>
        </div>
    </a>
    {% endfor %}
</div>
