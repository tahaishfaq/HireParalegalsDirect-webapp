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
import { StateService } from '../services/state.service';
import { Country, State, City }  from 'country-state-city';
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
  states: any[] = [];
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
    private stateService: StateService
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
this.loadStates();
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
  loadStates() {
    this.states = State.getStatesOfCountry('US'); // Fetching US states
    console.log(this.states);
  }

  selectState(state: any) {
    this.stateService.setSelectedState(state);
    this.router.navigate(['/paralegals-by-location']);
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


  isNavbarOpen = false;

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
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

  redirectTo(value) {
    this.router.navigate([value]);
    this.seachTextEmpty.emit(true);
  }

  ToggleClass() {
    if (this.toggleClass === "ft-maximize") {
      this.toggleClass = "ft-minimize";
    } else {
      this.toggleClass = "ft-maximize";
    }
  }


  toggleNotificationSidebar() {
    this.layoutService.toggleNotificationSidebar(true);
  }

  toggleSidebar() {
    this.layoutService.toggleSidebarSmallScreen(this.hideSidebar);
  }
}
