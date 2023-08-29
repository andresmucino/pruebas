import {
  EuiHorizontalRule,
  EuiListGroup,
  EuiListGroupItem,
} from "@elastic/eui";

export const Menu = () => {
  return (
    <EuiListGroup>
      <EuiListGroupItem
        iconType="home"
        label="Home"
        onClick={() => "/"}
        isActive
        href="/"
      />
      <EuiHorizontalRule margin="xs" />
      <EuiListGroupItem
        iconType="users"
        onClick={() => "/clients"}
        label="Clientes"
        href="/clients"
      />
      <EuiHorizontalRule margin="xs" />
      <EuiListGroupItem
        iconType="kubernetesNode"
        label="Almacenes clientes"
        onClick={() => "/warehousesClients"}
        href="/warehousesClients"
      />
      <EuiHorizontalRule margin="xs" />
      <EuiListGroupItem
        iconType="importAction"
        iconProps={{ color: "default" }}
        onClick={() => "/generatePackages"}
        label="Generar paquetes"
        href="/generatePackages"
      />
      <EuiHorizontalRule margin="xs" />
      <EuiListGroupItem
        iconType="documentEdit"
        label="Crear envío"
        onClick={() => "/createShipment"}
        href="/createShipment"
      />
      <EuiHorizontalRule margin="xs" />
      <EuiListGroupItem
        iconType="package"
        label="Paquetes"
        onClick={() => "/packages"}
        href="/packages"
      />
      <EuiHorizontalRule margin="xs" />
      <EuiListGroupItem
        iconType="kubernetesPod"
        label="Historial de paquetes"
        onClick={() => "/packagesHistory"}
        href="/packagesHistory"
      />
      <EuiHorizontalRule margin="xs" />
      <EuiListGroupItem
        iconType="dotInCircle"
        label="Envíos"
        onClick={() => "/shipments"}
        href="/shipments"
      />
      <EuiHorizontalRule margin="xs" />
      <EuiListGroupItem
        onClick={() => "/messengers"}
        iconType="timeline"
        label="Mensajeros"
        href="/messengers"
      />
      <EuiHorizontalRule margin="xs" />
      <EuiListGroupItem
        onClick={() => "/users"}
        iconType="user"
        label="Usuarios"
        href="/users"
      />
    </EuiListGroup>
  );
};
