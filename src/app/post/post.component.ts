import { Component, ViewChild } from '@angular/core';
import { IPost } from '../models/IPost';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent {
  posts: IPost[]=[]
  displayedColumns: string[] = ['title','content', 'status', 'comment'];
  dataSource = new MatTableDataSource<IPost>(this.posts);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private postSrv: PostService) {
    this.postSrv.getAllPosts().subscribe(res=>{
      this.posts = res.data;
      this.dataSource = new MatTableDataSource<IPost>(this.posts);
    })
   }

   deleteRows(_id: string) {
    this.postSrv.delete(_id).subscribe(
      (res) => {
        console.log(res)
        // this.route.navigateByUrl('nurse')
      },
      (err) => {
        console.log(err);
      }
      );  
  }







   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
