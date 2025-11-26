"use client";
import { useRef } from "react";
import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import type { Todo } from "../../types/Todo";
type Props = {
    todo: Todo | null;
    action: string;
    openModal?: boolean
    setOpenModal(openModal: boolean): void;
    onConfirmDelete(): void;
    onConfirmEdit(): void;
}

export function TodoModal({ todo, action, openModal, setOpenModal, onConfirmEdit, onConfirmDelete }: Props) {
    const emailInputRef = useRef<HTMLInputElement>(null);

    if (action === "edit")
        return (

            <>
                <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)} initialFocus={emailInputRef}>
                    <ModalHeader />
                    <ModalBody>
                        <div className="space-y-6">
                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign in to our platform</h3>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="email">Your email</Label>
                                </div>
                                <TextInput id="email" ref={emailInputRef} placeholder="name@company.com" required />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <Label htmlFor="password">Your password</Label>
                                </div>
                                <TextInput id="password" type="password" required />
                            </div>
                            <div className="flex justify-between">
                                <div className="flex items-center gap-2">
                                    <Checkbox id="remember" />
                                    <Label htmlFor="remember">Remember me</Label>
                                </div>
                                <a href="#" className="text-sm text-primary-700 hover:underline dark:text-primary-500">
                                    Lost Password?
                                </a>
                            </div>
                            <div className="w-full">
                                <Button onClick={onConfirmEdit}>Confirmar</Button>
                            </div>
                            <div className="flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                                Not registered?&nbsp;
                                <a href="#" className="text-primary-700 hover:underline dark:text-primary-500">
                                    Create account
                                </a>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            </>
        );
    if (action === "delete") {

        return (
            <>
                <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                    <ModalHeader />
                    <ModalBody>
                        <div className="text-center">
                            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                            {todo && (
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                    ¿Estás seguro de eliminar este Todo: <span>{todo.name}</span>
                                    ?
                                </h3>
                            )}

                            <div className="flex justify-center gap-4">
                                <Button color="red" onClick={onConfirmDelete}>
                                    Yes, I'm sure
                                </Button>
                                <Button color="alternative" onClick={() => setOpenModal(false)}>
                                    No, cancel
                                </Button>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            </>
        );
    }
}