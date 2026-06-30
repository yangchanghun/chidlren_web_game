type ModalProps = {
  children: React.ReactNode;
};

export const Modal = ({ children }: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-card rounded-3xl p-10 shadow-2xl flex flex-col items-center gap-4 animate-pop">
        {children}
      </div>
    </div>
  );
};
