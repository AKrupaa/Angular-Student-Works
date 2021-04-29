import { HostBinding } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

import { Article } from './article.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  @Input() article: Article;
  @HostBinding('attr.class') cssClass = 'row';

  constructor() {
  }

  voteUp(): boolean {
    // this.article.votes += 1;
    this.article.voteUp();
    return false;
  }

  voteDown(): boolean {
    // this.article.votes -= 1;
    this.article.voteDown();
    return false;
  }

  ngOnInit(): void {}
}
