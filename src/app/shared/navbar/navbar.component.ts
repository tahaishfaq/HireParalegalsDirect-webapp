import { Component, Output, EventEmitter, OnDestroy, OnInit, AfterViewInit, ChangeDetectorRef, Inject, Renderer2, ViewChild, ElementRef, ViewChildren, QueryList, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from '../services/layout.service';
import { Observable, Subscription } from 'rxjs';
import { ConfigService } from '../services/config.service';
import { DOCUMENT } from '@angular/common';
import { CustomizerService } from '../services/customizer.service';
import { UntypedFormControl } from '@angular/forms';
import { LISTITEMS } from '../data/template-search';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { pluck } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginModalComponent } from 'app/pages/content-pages/login-modal/login-modal.component';
import { JoinModalComponent } from 'app/pages/content-pages/join-modal/join-modal.component';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"]
})
export class NavbarComponent implements OnInit, AfterViewInit, OnDestroy {
  isLoggedIn: boolean = false;
  loggedInUserName: string | null = null;
  currentLang = "en";
  selectedLanguageText = "English";
  selectedLanguageFlag = "./assets/img/flags/us.png";
  toggleClass = "ft-maximize";
  placement = "bottom-right";
  logoUrl = '';
  menuPosition = 'Side';
  isSmallScreen = false;
  protected innerWidth: any;
  searchOpenClass = "";
  transparentBGClass = "";
  hideSidebar: boolean = true;
  public isCollapsed = true;
  layoutSub: Subscription;
  configSub: Subscription;
  name: string;
  username$: Observable<string>;

  @ViewChild('search') searchElement: ElementRef;
  @ViewChildren('searchResults') searchResults: QueryList<any>;

  @Output()
  toggleHideSidebar = new EventEmitter<Object>();

  @Output()
  seachTextEmpty = new EventEmitter<boolean>();

  listItems = [];
  control = new UntypedFormControl();

  public config: any = {};

  constructor(public translate: TranslateService,
    private layoutService: LayoutService,
    private router: Router,
    private modalService: NgbModal,
    private configService: ConfigService, private cdr: ChangeDetectorRef,
    public auth: AuthService,
  ) {

    this.username$ = this.auth.auth$.pipe(pluck('name'));
    this.username$.subscribe((event) => (this.name = event));
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|es|pt|de/) ? browserLang : "en");
    this.config = this.configService.templateConf;
    this.innerWidth = window.innerWidth;

    this.layoutSub = layoutService.toggleSidebar$.subscribe(
      isShow => {
        this.hideSidebar = !isShow;
      });

  }

  ngOnInit() {

    this.listItems = LISTITEMS;

    if (this.innerWidth < 1200) {
      this.isSmallScreen = true;
      this.cdr.detectChanges(); // Trigger manual change detection
    }
    else {
      this.isSmallScreen = false;
      this.cdr.detectChanges(); // Trigger manual change detection
    }

    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const user = this.auth.getLoggedInUser();
    this.loggedInUserName = user ? user.name : null;

    // Listen for login event
    window.addEventListener('userLoggedIn', () => {
      this.isLoggedIn = true;
    });

    this.auth.isLoggedIn$.subscribe(status => {
      this.isLoggedIn = status;
    });
  
  }
  logout(): void {
    this.auth.logout();
  }
  ngAfterViewInit() {

    this.configSub = this.configService.templateConf$.subscribe((templateConf) => {
      if (templateConf) {
        this.config = templateConf;
      }
      this.loadLayout();
      this.cdr.markForCheck();

    })
  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
    if (this.configSub) {
      this.configSub.unsubscribe();
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = event.target.innerWidth;
    if (this.innerWidth < 1200) {
      this.isSmallScreen = true;
      this.cdr.detectChanges(); // Trigger manual change detection
    }
    else {
      this.isSmallScreen = false;
      this.cdr.detectChanges(); // Trigger manual change detection
    }
  }
  openLoginModal() {
    this.modalService.open(LoginModalComponent, { size: 'md', centered: true });
  }

  openJoinModal() {
    this.modalService.open(JoinModalComponent, {
      size: 'md',
      centered: true,
      scrollable: true // Allows modal body to be scrollable
    });
  }

  loadLayout() {
    // Check and set the menu position if provided
    if (this.config.layout.menuPosition && this.config.layout.menuPosition.toString().trim() !== "") {
      this.menuPosition = this.config.layout.menuPosition;
    }

    // Check the window width and set the logo accordingly
    if (window.innerWidth < 1200) {
      // For smaller screens (below 800px), use the mobile logo
      if (this.config.layout.variant === "Light") {
        this.logoUrl = 'assets/img/mobile-logo.svg'; // Mobile logo for small screens
      } else {
        this.logoUrl = 'assets/img/mobile-logo.svg'; // Mobile logo for non-light variant on small screens
      }
    } else {
      // For larger screens (800px or above), use the default logo
      if (this.config.layout.variant === "Light") {
        this.logoUrl = 'assets/img/logo-dark-color.png'; // Dark logo for larger screens in light variant
      } else {
        this.logoUrl = 'assets/img/logo-dark-color.png'; // Default logo for non-light variant
      }
    }

    // Transparent background class for sidebar
    if (this.config.layout.variant === "Transparent") {
      this.transparentBGClass = this.config.layout.sidebar.backgroundColor;
    } else {
      this.transparentBGClass = "";
    }
  }
  onSearchKey(event: any) {
    if (this.searchResults && this.searchResults.length > 0) {
      this.searchResults.first.host.nativeElement.classList.add('first-active-item');
    }

    if (event.target.value === "") {
      this.seachTextEmpty.emit(true);
    }
    else {
      this.seachTextEmpty.emit(false);
    }
  }

  removeActiveClass() {
    if (this.searchResults && this.searchResults.length > 0) {
      this.searchResults.first.host.nativeElement.classList.remove('first-active-item');
    }
  }

  onEscEvent() {
    this.control.setValue("");
    this.searchOpenClass = '';
    this.seachTextEmpty.emit(true);
  }

  onEnter() {
    if (this.searchResults && this.searchResults.length > 0) {
      let url = this.searchResults.first.url;
      if (url && url != '') {
        this.control.setValue("");
        this.searchOpenClass = '';
        this.router.navigate([url]);
        this.seachTextEmpty.emit(true);
      }
    }
  }

  redirectTo(value) {
    this.router.navigate([value]);
    this.seachTextEmpty.emit(true);
  }


  ChangeLanguage(language: string) {
    this.translate.use(language);

    if (language === 'en') {
      this.selectedLanguageText = "English";
      this.selectedLanguageFlag = "./assets/img/flags/us.png";
    }
    else if (language === 'es') {
      this.selectedLanguageText = "Spanish";
      this.selectedLanguageFlag = "./assets/img/flags/es.png";
    }
    else if (language === 'pt') {
      this.selectedLanguageText = "Portuguese";
      this.selectedLanguageFlag = "./assets/img/flags/pt.png";
    }
    else if (language === 'de') {
      this.selectedLanguageText = "German";
      this.selectedLanguageFlag = "./assets/img/flags/de.png";
    }
  }

  ToggleClass() {
    if (this.toggleClass === "ft-maximize") {
      this.toggleClass = "ft-minimize";
    } else {
      this.toggleClass = "ft-maximize";
    }
  }

  toggleSearchOpenClass(display) {
    this.control.setValue("");
    if (display) {
      this.searchOpenClass = 'open';
      setTimeout(() => {
        this.searchElement.nativeElement.focus();
      }, 0);
    }
    else {
      this.searchOpenClass = '';
    }
    this.seachTextEmpty.emit(true);
  }

// logout(){
//   this.auth.logout();
  
//   console.log("Logout is called");
// }

  toggleNotificationSidebar() {
    this.layoutService.toggleNotificationSidebar(true);
  }

  toggleSidebar() {
    this.layoutService.toggleSidebarSmallScreen(this.hideSidebar);
  }
}
