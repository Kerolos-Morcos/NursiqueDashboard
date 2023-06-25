import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { query, style, transition, trigger, animate, animateChild, group, state } from '@angular/animations';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  
  animations: [
    trigger('routeMove', [
      transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            // top: '43px',
            left: '23.8px',
            width: '96.45%',
          })
        ],
        { optional: true }),
        query(':enter', [
          style({ opacity: 0.5 })
        ], { optional: true }),
        query(':leave', animateChild(), { optional: true }),
        group([
          query(':leave', [
            animate('400ms linear', style({ opacity: 0 }))
          ], { optional: true }),
          query(':enter', [
            animate('800ms linear', style({ opacity: 1 }))
          ], { optional: true }),
        ]),
      ]),
      transition('* <=> *', [
        style({ position: 'relative' }),
        query(':enter, :leave', [
          style({
            position: 'absolute',
            // top: '70px',
            // left: '23px',
            width: '94%'
          })
        ], { optional: true }),
        query(':enter', [
        ], { optional: true }),
        query(':leave', animateChild(), { optional: true }),
        group([
          query(':leave', [
            animate('800ms linear', style({ opacity: 1 }))
          ], { optional: true }),
          query(':enter', [
            animate('400ms linear', style({ opacity: 0 }))
          ], { optional: true }),
          query('@*', animateChild(), { optional: true })
        ]),
      ])
    ])
  ]
  
  
})
export class NavbarComponent implements OnInit {
  
   
  name:string=''
  pic:string=''

  constructor( private login:LoginService,private router:Router, private location: Location
    ) {
      this.login.StoredUserSub.subscribe({
        next: (user) => {
          this.name = user.name;
          this.pic = user.image;
        }
      })
     }


     logout() {
      this.login.logout();
      // this.router.navigateByUrl('login');
      this.location.replaceState('login'); // replace the current URL with 'login'
      window.location.reload(); // reload the page
    }

  
  ngOnInit(): void {
    const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
    allSideMenu.forEach(item => {
      const li = item.parentElement;

      item.addEventListener('click', function () {
        allSideMenu.forEach(i => {
          const parent = i.parentElement;
          if (parent) {
            parent.classList.remove('active');
          }
        })
        if (li) {
          li.classList.add('active');
        }
      })
    });

    const menuBar = document.querySelector('#content nav .bx.bx-menu') as HTMLElement;
    const sidebar = document.getElementById('sidebar') as HTMLElement;
    const content = document.getElementById('content') as HTMLElement;
    
    menuBar.addEventListener('click', function () {
      sidebar.classList.toggle('hide');
    })

    const searchButton = document.querySelector('#content nav form .form-input button') as HTMLElement;
    const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx') as HTMLElement;
    const searchForm = document.querySelector('#content nav form') as HTMLElement;

    searchButton.addEventListener('click', function (e) {
      if (window.innerWidth < 576) {
        e.preventDefault();
        searchForm.classList.toggle('show');
        if (searchForm.classList.contains('show')) {
          searchButtonIcon.classList.replace('bx-search', 'bx-x');
        } else {
          searchButtonIcon.classList.replace('bx-x', 'bx-search');
        }
      }
    })
    
    if (window.innerWidth < 768) {
      sidebar.classList.add('hide');
    } else if (window.innerWidth > 576) {
      searchButtonIcon.classList.replace('bx-x', 'bx-search');
      searchForm.classList.remove('show');
    }
    
    window.addEventListener('resize', function () {
      if (this.innerWidth > 576) {
        searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
      }
    })
    
    
  //   const switchMode = document.getElementById('switch-mode') as HTMLInputElement;

  //   switchMode.addEventListener('change', function () {
  //     if (this.checked) {
  //       document.body.classList.add('dark');
  //     } else {
    //       document.body.classList.remove('dark');
    //     }
    //   });
  }


  // const sidebar = document.getElementById('sidebar') as HTMLElement;

  @ViewChild('sidebar') sidebar!: ElementRef;
  // @ViewChild('content') content!: ElementRef;
  @ViewChild('brand') brand!: ElementRef;
  @ViewChild('nav') nav!: ElementRef;

  
  // Dark Mode
  display(element: any) {
    if (element.checked) {
      this.sidebar.nativeElement.classList.add('dark');
      // this.content.nativeElement.classList.add('dark');
      this.brand.nativeElement.classList.add('dark');
      this.nav.nativeElement.classList.add('dark');
      document.body.classList.add('dark')
      console.log("dark");
    } else {
      this.sidebar.nativeElement.classList.remove('dark');
      // this.content.nativeElement.classList.remove('dark');
      this.brand.nativeElement.classList.remove('dark');
      this.nav.nativeElement.classList.remove('dark');
      document.body.classList.remove('dark')
      console.log("light");
    }
  }




}