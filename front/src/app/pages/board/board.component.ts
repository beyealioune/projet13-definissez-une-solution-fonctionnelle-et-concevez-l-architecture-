import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';
import { User } from 'src/app/models/user';
import { ArticleService } from 'src/app/services/article.service';
import { SubscribeService } from 'src/app/services/subscribe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  currentUser!: User;
  articles!: Article[];

  constructor(
    private articleService: ArticleService,
    private userService: UserService,
    private subscriptionService: SubscribeService
  ) {}

  ngOnInit(): void {

  
      this.userService.getAuthenticatedUser().subscribe(
        (user: User) => {
          this.currentUser = user;
          console.log('Current user:', this.currentUser);
          
          const idUser = this.currentUser.id;
          
      // this.articleService.getArticlesByUser(idUser).subscribe(data => {
      //   this.articles = data;
      //   console.log('Articles:', this.articles);
        
      // });
      this.loadSubscribedArticles(this.currentUser.id);
        },
        (error) => {
          console.error('Error fetching authenticated user:', error);
        }
      );
    
    
    
    console.log(this.articles);
    
  }

 

  loadSubscribedArticles(userId: number): void {
    this.subscriptionService.getSubscribedArticles(userId).subscribe(
      (data: Article[]) => {
        this.articles = data;
        console.log('Articles:', this.articles);
      },
      (error) => {
        console.error('Error fetching articles:', error);
      }
    );
  }
}
