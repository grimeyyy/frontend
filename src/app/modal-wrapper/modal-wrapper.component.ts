import {Component, OnDestroy} from '@angular/core';
import {Subject, takeUntil, zip} from 'rxjs';
import {NgbModal, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

/**
 * this class wraps modal windows to make them reusable and routable, so the user can access any modal through a deeplink
 */
@Component({
  selector: 'app-modal-wrapper',
  template: '',
  standalone: true,
})
export class ModalWrapperComponent implements OnDestroy {
  destroy = new Subject<any>();
  currentDialog: NgbModalRef | undefined;
  dialogResult: any;

  constructor(
    private modalService: NgbModal,
    route: ActivatedRoute,
    private location: Location
  ) {
    let routeParams = route.params;
    let routeData = route.data;

    zip(routeParams, routeData)
      .pipe(takeUntil(this.destroy)).subscribe(result => {
        console.log(result);
      let content = result[1]['component']
      this.currentDialog = this.modalService.open(content, {centered: true});
      this.currentDialog.componentInstance.params = result[0];
      this.currentDialog.componentInstance.stateParams = window?.history.state['data'];

      this.dialogResult = this.currentDialog.result.then(result => {
        if (result !== -1) {
          this.location.back();
        }
      }, reason => {
        this.location.back();
      });
    });
  }

  ngOnDestroy(): void {
    this.destroy.next(undefined);
    this.currentDialog?.close(-1);
    this.dialogResult = null;
  }

}
