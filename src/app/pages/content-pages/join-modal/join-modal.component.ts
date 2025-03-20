import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'app/shared/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-join-modal',
  templateUrl: './join-modal.component.html',
  styleUrls: ['./join-modal.component.scss']
})
export class JoinModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private toastr: ToastrService,  private authService: AuthService) { }

  ngOnInit(): void {
  }
  dismiss() {
    this.activeModal.dismiss(); // Closes the modal
  }
}
