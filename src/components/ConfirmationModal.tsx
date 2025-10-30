import React from 'react';
import Modal from '@/components/ui/modal'; // O Modal genérico
import { AlertTriangle } from 'lucide-react';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

const ConfirmationModal: React.FC<Props> = ({ isOpen, onClose, onConfirm, title, message }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <div className="text-center">
                <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
                <p className="my-4 text-gray-600">{message}</p>
                <div className="flex justify-center gap-4 mt-6">
                    <button onClick={onClose} className="px-6 py-2 rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 transition">
                        Cancelar
                    </button>
                    <button onClick={onConfirm} className="px-6 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 transition">
                        Confirmar Exclusão
                    </button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmationModal;