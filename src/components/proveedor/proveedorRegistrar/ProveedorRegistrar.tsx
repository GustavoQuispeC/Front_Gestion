import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ProveedorRegistrar() {
  return (
    <form className="max-w-4xl mx-auto mt-4">
      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <Label >
            Razón Social
          </Label>
          <div className="relative flex items-center">
            <Input type="text" placeholder="First Name" />
          </div>
        </div>

        <div>
          <Label className="mb-2 text-sm text-slate-900 font-medium block">
            RUC
          </Label>
          <div className="relative flex items-center">
            <Input type="text" placeholder="Last Name" />
          </div>
        </div>

        <div>
          <Label className="mb-2 text-sm text-slate-900 font-medium block">
            Teléfono
          </Label>
          <div className="relative flex items-center">
            <Input type="email" placeholder="Email" />
          </div>
        </div>

        <div>
          <Label className="mb-2 text-sm text-slate-900 font-medium block">
            Dirección
          </Label>
          <div className="relative flex items-center">
            <Input type="password" placeholder="Password" />
          </div>
        </div>
      </div>

      <Button type="button" variant="default" className="mt-6">
        Submit
      </Button>
    </form>
  );
}
