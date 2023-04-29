import { Injectable, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { AppInjector } from '../../app.injector';

import { BaseItemComponent } from './base-item.component';

/**
 * The 'BaseEditComponent' provides the common API for edit component.
 *
 * Service, operations, forms, validations are all available.
 *
 * All edit components MUST extend this class.
 *
 * @extends BaseItemComponent
 *
 * @property {any}          item      - item which is being edited.
 */
@Injectable()
export abstract class BaseEditComponent extends BaseItemComponent implements OnInit {

    /**
     * Builder for the form.
     *
     * @type {FormBuilder}
     */
    protected formBuilder: FormBuilder = AppInjector.get(FormBuilder);

    public submitting = false;

    //@ts-ignore
    public customInsertMessage: string = null;

    /**
     * Form for edition.
     */
    //@ts-ignore
    public editForm: FormGroup;

    /**
     * Constructor.
     */
    constructor() {
        super();
    }

    /**
     * On Init of the component.
     */
    override ngOnInit(): void {
        super.ngOnInit();
        this.submitting = false;
        this.initForm();
    }

    /**
     * Initialize the edit form.
     */
    initForm(): void {
        this.editForm = this.formBuilder.group(
            this.getFormControls()
        );
    }

    /**
     * Invoked when user submits the form.
     *
     * Checks if the item's id exists:
     * - No:  Inserts the item.
     * - Yes: Updates the item.
     *
     * Notifies by a 'toast' at the end: Success or Error.
     *
     * If success, go back to the list component.
     */
    onSubmit(): void {
        this.submitting = true;
        this.preUpdate();
        if (this.isUpdatePartial()) {
            this.updatePartial();

        } else {
            this.update();
        }
    }

    /**
     * Gets the form value.
     *
     * @returns {any}
     */
    protected getFormValue() {
        return this.editForm.value;
    }


    /**
     * Updates the item.
     */
    protected update(): void {
        this.service.update(this.getServiceURL(), this.item.id, this.getFormValue()).subscribe(
            result => {
                this.submitting = false;
                this.handleUpdate(result);
            },
            error => {
                this.submitting = false;
                this.notification.error(error.error ? error.error.message : error.message);
            }
        );
    }

    /**
     * Updates the item partially.
     */
    protected updatePartial(): void {
        this.service.updatePartial(this.getServiceURL(), this.item.id, this.getFormValue()).subscribe(
            result => {
                this.submitting = false;
                this.handleUpdate(result);
            },
            error => {
                this.submitting = false;
                this.notification.error(error.error ? error.error.message : error.message);
            }
        );
    }

    /**
     * Handles the update result.
     *
     * @param result
     */
    //@ts-ignore
    protected handleUpdate(result): void {
        this.postUpdate();
        this.notification.updateSuccess();
        this.backToList();
    }

    /**
     * Fills the form with the item retrieved.
     *
     * @override
     */
    //@ts-ignore
    protected postGetItem(): void {
        this.editForm.setValue(this.item);
    }


    /**
     * Executes before update operation.
     */
    protected preUpdate(): void {

    }

    /**
     * Executes post successful update.
     */
    protected postUpdate(): void {

    }

    /**
     * Flag to control if the update is full or partial.
     * By default: Full.
     *
     * @returns {boolean}
     */
    protected isUpdatePartial(): boolean {
        return false;
    }

    /**
     * Gets the form controls.
     *
     * @returns {Object}
     */
    abstract getFormControls(): Object;

}
