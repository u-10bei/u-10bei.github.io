---
layout: page
title: Post category
description:  >-
  My interests and concerns.<br>
  私の興味の中心
background: '/img/bg-post.jpg'
pagination:
  enabled: true
  permalink: '/category/:num/'
---

{% for categories in site.categories %}
{% assign category = categories[0] %}
<div>
  <h3>{{ category }}</h3>
  {% for post in site.categories[category] %}
  <p><a href="{{ post.url | absolute_url }}">
    {{ post.title }}
  </a></p>
  {% endfor %}
</div>
<br>
{% endfor %}