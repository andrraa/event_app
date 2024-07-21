import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './event/event.component';
import { TicketComponent } from './ticket/ticket.component';
import { TransactionComponent } from './transaction/transaction.component';
import { roleGuard } from '../core/guard/role.guard';

const routes: Routes = [
  {
    path: 'main',
    component: EventComponent,
    title: 'Event',
    data: { role: ['Admin', 'Inputer'] },
    canActivate: [roleGuard],
  },
  {
    path: 'ticket',
    component: TicketComponent,
    title: 'Ticket',
    data: { role: ['Admin', 'Inputer'] },
    canActivate: [roleGuard],
  },
  {
    path: 'transaction',
    component: TransactionComponent,
    title: 'Transaction',
    data: { role: ['Admin', 'Viewer'] },
    canActivate: [roleGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventRoutingModule {}
