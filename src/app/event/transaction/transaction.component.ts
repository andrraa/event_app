import { Component } from '@angular/core';
import { AlertService } from '../../services/alert/alert.service';
import { TransactionService } from '../services/transaction/transaction.service';
import { ApiResponse } from '../../models/response.model';
import {
  TransacationCreateSuccess,
  TransactionCreateRequest,
  TransactionExportRequest,
} from '../../models/transaction.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  EventUtilitySuccess,
  TicketUtilitySuccess,
} from '../../models/utility.model';
import { UtilityService } from '../../services/utility/utility.service';
import { TicketService } from '../services/ticket/ticket.service';
import { TicketCreateSuccess } from '../../models/ticket.model';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.css',
})
export class TransactionComponent {
  constructor(
    private alert: AlertService,
    private formService: FormBuilder,
    private ticketService: TicketService,
    private transactionService: TransactionService,
    private utilityService: UtilityService
  ) {
    this.transactions();
  }

  page: number = 1;

  // Transaction List
  isLoadingTransactionList: boolean = false;
  transactionList: TransacationCreateSuccess[] = [];

  async transactions() {
    this.isLoadingTransactionList = true;

    try {
      const result: ApiResponse<TransacationCreateSuccess[]> =
        await this.transactionService.transactions();

      if (result.data != undefined) {
        this.transactionList = result.data;
      }

      this.isLoadingTransactionList = false;
    } catch (error) {
	  this.transactionList = [];
	  
      const errorResponse = error as ApiResponse<null>;

      this.alert.showToast({ icon: 'error', title: errorResponse.message });

      this.isLoadingTransactionList = false;
    }
  }

  // Transaction Delete
  async delete(id: number) {
    try {
      const result = await this.transactionService.delete(id);

      if (result) {
        this.transactions();
      }
    } catch (error) {
      const errorResponse = error as ApiResponse<null>;

      this.alert.showToast({ icon: 'error', title: errorResponse.message });
    }
  }

  // Transaction Create
  isShowingForm: boolean = false;
  transactionForm: FormGroup = this.formService.group({
    date: ['', Validators.required],
    event_id: ['', Validators.required],
    ticket_id: ['', Validators.required],
    quantity: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
  });

  async onSubmit() {
    const data = this.transactionForm.value;
    const date = this.formatDateTime(data.date);

    const request: TransactionCreateRequest = {
      date: date,
      event_id: data.event_id,
      ticket_id: data.ticket_id,
      quantity: data.quantity,
      name: data.name,
      email: data.email,
      phone: data.phone,
    };

    if (this.isUpdate) {
      try {
        const result = await this.transactionService.update(
          request,
          this.currentTransactionId
        );

        if (result.code === 200) {
          this.alert.showToast({
            icon: 'success',
            title: 'Transaction updated successfully!',
          });

          this.isUpdate = false;
          this.currentTransactionId = 0;
          this.isShowingForm = false;
          this.transactionForm.reset();
          this.transactions();
        }
      } catch (error) {
        const errorResponse = error as ApiResponse<null>;

        this.alert.showToast({ icon: 'error', title: errorResponse.message });
      }
    } else {
      try {
        const result = await this.transactionService.create(request);

        if (result.code === 201) {
          this.alert.showToast({
            icon: 'success',
            title: 'Transaction created successfully!',
          });

          this.isShowingForm = false;
          this.transactionForm.reset();
          this.transactions();
        }
      } catch (error) {
        const errorResponse = error as ApiResponse<null>;

        this.alert.showToast({ icon: 'error', title: errorResponse.message });
      }
    }
  }

  toggleFormVisibility(): void {
    this.isShowingForm = !this.isShowingForm;
  }

  private formatDateTime(dateTime: string | null): string {
    if (!dateTime) {
      return '';
    }

    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  // Drodown Event List
  isLoadingEventList: boolean = false;
  eventList: EventUtilitySuccess[] = [];

  async events() {
    this.isLoadingEventList = true;

    try {
      const result: ApiResponse<EventUtilitySuccess[]> =
        await this.utilityService.events();

      if (result.data != undefined) {
        this.eventList = result.data;
      }

      this.isLoadingEventList = false;
    } catch (error) {
      const errorResponse = error as ApiResponse<null>;

      this.alert.showToast({ icon: 'error', title: errorResponse.message });

      this.isLoadingEventList = false;
    }
  }

  // Drodown Ticket List
  isLoadingTicketList: boolean = false;
  ticketList: TicketUtilitySuccess[] = [];

  async tickets() {
    this.isLoadingTicketList = true;

    try {
      const result: ApiResponse<TicketCreateSuccess[]> =
        await this.ticketService.tickets();

      if (result.data != undefined) {
        this.ticketList = result.data;
      }

      this.isLoadingTicketList = false;
    } catch (error) {
      const errorResponse = error as ApiResponse<null>;

      this.alert.showToast({ icon: 'error', title: errorResponse.message });

      this.isLoadingTicketList = false;
    }
  }

  // Update Ticket
  isUpdate: boolean = false;
  currentTransactionId: number = 0;

  update(item: TransacationCreateSuccess) {
    this.isUpdate = true;
    this.currentTransactionId = item.id;

    this.ticketList.push({
      id: item.ticket.id,
      name: item.ticket.name,
    });

    this.eventList.push({
      id: item.event.id,
      name: item.event.name,
    });

    this.transactionForm.patchValue({
      date: item.date,
      event_id: item.event_id,
      ticket_id: item.ticket_id,
      quantity: item.quantity,
      name: item.name,
      email: item.email,
      phone: item.phone,
    });

    this.toggleFormVisibility();
  }

  // Export
  exportForm: FormGroup = this.formService.group({
    start_date: ['', Validators.required],
    end_date: ['', Validators.required],
  });

  exportReport() {
    const data = this.exportForm.value;

    const request: TransactionExportRequest = {
      start_date: data.start_date,
      end_date: data.end_date,
    };

    this.transactionService.export(request).subscribe({
      next: (response: Blob) => {
        const fileName = `TransactionReport-${data.start_date}-${data.end_date}.xlsx`;
        const fileBlob = response;
        const fileLink = document.createElement('a');
        fileLink.download = fileName;
        fileLink.href = window.URL.createObjectURL(fileBlob);
        fileLink.click();
        window.URL.revokeObjectURL(fileLink.href);
      },
      error: (error: any) => {
        console.error(error);
        this.alert.showToast({
          icon: 'error',
          title: 'Failed to generate report',
        });
      },
    });
  }
}
