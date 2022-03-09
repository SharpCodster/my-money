import { Component, OnInit,OnDestroy, Directive } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { BaseApi } from '../../api/base-api';
import { NotifierService } from '../../core/notifier/notifier.service';
import { LoggerService } from '../../core/logger/log.service';
import { BaseId } from '../../core/models/base-id';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Directive()
export abstract class BaseDetailsComponent<TModel extends BaseId> implements OnInit, OnDestroy {

    protected destroyed$ = new Subject();
    protected data: TModel;
    public form: FormGroup;
    protected id: number = -1;
    protected isNew: boolean = true;
    public isReadOnly: boolean = true;
    protected refreshValidation: boolean = false;
    protected isBusy: boolean = true;

    public title: string = "";

    protected createdWithSuccessMessage: string = "a";
    protected updatedWithSuccessMessage: string = "b";
    protected deletedWithSuccessMessage: string = "c";

    constructor(
        protected desc: string,
        protected notifier: NotifierService,
        protected service: BaseApi<TModel>,
        protected route: ActivatedRoute,
        protected logger: LoggerService
    ) { 

    }

    protected abstract createForm(): FormGroup;

    protected abstract getModelName(model: TModel): string;

    protected abstract navigateToDetail(id: number): void;
    protected abstract navigateToList(): void;

    ngOnInit(): void {
        this.logger.debug('BaseDestroyableComponent.ngOnInit')
        this.subscribeToBusyIndicator();
        this.form = this.createForm();
        this.subscribeToParamRetrival();
    }

    ngOnDestroy(): void {
        this.logger.debug('BaseDestroyableComponent.ngOnDestroy')
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    edit(): void {
        this.isReadOnly = false;
    }
    
    cancel(): void {
        if (this.confirmLooseChangesIfAny()) {
            this.dataToForm(this.data);
            this.isReadOnly = true;
        }
    }
    
    save(): void {
        if (!this.form.valid || this.isReadOnly) {
            return;
        }
        const data = this.formToData();
        this.isNew ? this.create(data) : this.update(data);
    }
    
    delete() {
        if (this.isNew || this.isReadOnly) {
            return;
        }

        if (!confirm(`${this.title} verrà cancellato. Proseguire?`)) {
            return;
        }

        this.service
            .delete$(this.id)
            .subscribe(_ => this.handleDeletedWithSuccess());
    }
    
    onFormSubmit(e: any) {
        this.save();
        e.preventDefault();
    }
    
    confirmLooseChangesIfAny(): boolean {
        if (this.form.dirty) {
            // todo: replace with devextreme dialog
            return confirm('Changes that you made may not be saved.');
        }
        return true;
    }
    
    back(): void {
        this.navigateToList();
    }

    private subscribeToBusyIndicator() {
        this.notifier.isBusy$
            .pipe(takeUntil(this.destroyed$))
            .subscribe(isBusy => {
                setTimeout(() => this.isBusy = isBusy);
            });
    }

    protected subscribeToParamRetrival() {
        this.route.paramMap
            .pipe(takeUntil(this.destroyed$))
            .subscribe(_ => this.handleRouteParamMap(_));
    }

    protected handleRouteParamMap(paramMap: ParamMap) {
        const id = +paramMap.get('id');

        this.id = id;

        this.data = <TModel>{};

        this.isNew = !this.id || this.id <= 0;
        this.isReadOnly = !this.isNew;

        if (this.isNew) {
          this.initializeNew();
        } else {
          this.refreshData(id);
        }
    }

    protected initializeNew() {
        this.refreshTitle();
    }

    protected refreshTitle() {
        //this.title = this.isNew ? `New ${this.desc}` : `${this.desc}: ${this.getModelName(this.data)}`;
    }

    protected enableValidationRefresh(form: FormGroup) {
        form.valueChanges
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => {
                this.refreshValidation = true;
                setTimeout(() => this.refreshValidation = false);
            });
    }

    private refreshData(id: number) {
        this.service
            .findById$(id)
            .subscribe(result => this.dataToForm(result));
    }

    protected dataToForm(data: TModel): void {

        this.data = data;
        this.id = data.id;

        this.form.patchValue(data);
        this.form.markAsPristine();

        this.refreshTitle();
    }

    protected formToData(): TModel {

        const data = <TModel>this.form.value;

        if (!this.isNew) {
            data.id = this.id;
        }

        return data;
    }

    private create(data: TModel) {
        this.service
            .create$(data)
            .subscribe(result => this.handleCreatedWithSuccess(result.id));
    }

    private update(data: TModel) {

        this.service
            .update$(data.id, data)
            .subscribe(result => this.handleUpdatedWithSuccess(result));
    }


    private handleCreatedWithSuccess(newId: number): void {
        const successMessage = this.createdWithSuccessMessage ? this.createdWithSuccessMessage : `${this.desc} creato con successo.`;
        this.notifier.success(successMessage);
        this.form.markAsPristine();
        //this.isReadOnly = true;
        this.navigateToDetail(newId);
    }

    private handleUpdatedWithSuccess(data: TModel): void {
        const successMessage = this.updatedWithSuccessMessage ? this.createdWithSuccessMessage : `${this.desc} aggiornato con successo.`;
        this.notifier.success(successMessage);
        this.isReadOnly = true;
        this.dataToForm(data);
    }

    private handleDeletedWithSuccess(): void {
        const successMessage = this.deletedWithSuccessMessage ? this.createdWithSuccessMessage : `${this.desc} eliminato con successo.`;
        this.notifier.success(successMessage);
        this.back();
    }

}
