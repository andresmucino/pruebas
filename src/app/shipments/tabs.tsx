import {
  MessengerShipmentInterface,
  PackagesShipmentInterface,
  WarehouseShipmentInterface,
} from "@/common";
import { Popover, SimpleList, Tabs, colors } from "@/components";
import {
  EuiAvatar,
  EuiDescriptionList,
  EuiImage,
  EuiLink,
  EuiPanel,
  EuiSpacer,
  EuiText,
} from "@elastic/eui";
import moment from "moment";
import { useState } from "react";

interface TabWarehouseProps {
  warehouseShipment: WarehouseShipmentInterface;
}

interface PackagesTabsProps {
  packagesShipment: Array<PackagesShipmentInterface>;
}

interface MessengerTabProps {
  messenger: MessengerShipmentInterface;
  children: React.ReactNode;
}

export const WarehouseTab: React.FC<TabWarehouseProps> = ({
  warehouseShipment,
}) => {
  return (
    <Tabs
      color={
        warehouseShipment.statusId === 1
          ? colors.pending
          : warehouseShipment.statusId === 2
          ? colors.primary
          : warehouseShipment.statusId === 3
          ? colors.success
          : warehouseShipment.statusId === 4
          ? colors.warning
          : warehouseShipment.statusId === 5
          ? colors.danger
          : colors.pending
      }
      index="P"
      tabs={[
        {
          id: "almacen--id",
          name: "Almacén",
          content: (
            <>
              <EuiDescriptionList
                listItems={[
                  {
                    title: "Dirección",
                    description: `${warehouseShipment.street}, ${
                      warehouseShipment.externalNumber
                    }, ${
                      warehouseShipment.internalNumber === 0
                        ? ""
                        : warehouseShipment.internalNumber
                    }, ${warehouseShipment.neigthboorhood}, ${
                      warehouseShipment.municipality
                    }, ${warehouseShipment.state}, ${
                      warehouseShipment.zipCode
                    }`,
                  },
                ]}
              />
              <EuiSpacer />
              <SimpleList
                title={"Contacto: "}
                description={`${warehouseShipment.firstName} ${warehouseShipment.lastName}`}
              />
              <SimpleList
                title="Télefono: "
                description={`${warehouseShipment.phone}`}
              />
              <SimpleList
                title="Correo: "
                description={`${warehouseShipment.email}`}
              />
            </>
          ),
        },
      ]}
    />
  );
};

export const PackagesTabs: React.FC<PackagesTabsProps> = ({
  packagesShipment,
}) => {
  return (
    <>
      {packagesShipment.map((i, index) => (
        <Tabs
          color={
            i.statusId === 2
              ? colors.pending
              : i.statusId === 4
              ? colors.primary
              : i.statusId === 5
              ? colors.success
              : i.statusId === 6 ||
                i.statusId === 7 ||
                i.statusId === 8 ||
                i.statusId === 9 ||
                i.statusId === 10 ||
                i.statusId === 11 ||
                i.statusId === 12 ||
                i.statusId === 13 ||
                i.statusId === 14 ||
                i.statusId === 15
              ? colors.danger
              : colors.pending
          }
          key={index}
          index={`${index + 1}`}
          tabs={[
            {
              id: "direction--id",
              name: "Informacion General",
              content: (
                <>
                  <EuiDescriptionList
                    listItems={[
                      {
                        title: "Dirección",
                        description: `${i.street}, ${i.externalNumber}, ${
                          i.internalNumber === 0 ? "" : i.internalNumber
                        }, ${i.neigthboorhood}, ${i.municipality}, ${
                          i.state
                        }, ${i.zipCode}`,
                      },
                    ]}
                  />
                  <EuiSpacer />
                  <SimpleList
                    title={"Contacto: "}
                    description={`${i.firstName} ${i.lastName}`}
                  />
                  <SimpleList title="Télefono: " description={`${i.phone}`} />
                  <SimpleList title="Correo: " description={`${i.email}`} />
                </>
              ),
            },
            {
              id: "packagesInformation--id",
              name: "Información del paquete",
              content: (
                <div
                  style={{
                    marginLeft: "0.5rem",
                    paddingTop: "0.5rem",
                    paddingBottom: "1rem",
                  }}
                >
                  <SimpleList title="Id paquete: " description={`${i.id}`} />
                  <SimpleList title="Guia: " description={`${i.guide}`} />
                  <SimpleList
                    title="Estatus del paquete: "
                    description={`${i.description}`}
                  />
                </div>
              ),
            },
            {
              id: "evidences--id",
              name: "Evidencias",
              content: (
                <div>
                  {i.evidences.map((ev, index) => (
                    <div style={{ width: "100%" }} key={ev.id}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div style={{ marginRight: "5rem" }}>
                          <SimpleList
                            title="Comentarios: "
                            description={`${ev.comments}`}
                          />
                          <SimpleList
                            title="Reribido: "
                            description={`${ev.personReceived}`}
                          />
                          <SimpleList
                            title="Fecha: "
                            description={`${moment
                              .utc(ev.createdAt)
                              .local()
                              .format("DD-MM-YYYY HH:mm")}`}
                          />
                        </div>
                        <div>
                          <EuiImage
                            size="m"
                            hasShadow
                            caption={""}
                            alt=""
                            width={100}
                            height={200}
                            src={`https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHVtYW58ZW58MHx8MHx8fDA%3D&w=1000&q=80`}
                          />
                        </div>
                      </div>
                      <EuiSpacer />
                    </div>
                  ))}
                </div>
              ),
            },
          ]}
        />
      ))}
    </>
  );
};

export const MessengerTabs: React.FC<MessengerTabProps> = ({
  messenger,
  children,
}) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  return (
    <>
      {messenger.id === undefined ? (
        <>
          <EuiPanel style={{ display: "flex" }} color="subdued">
            <EuiAvatar
              size="xl"
              name="?"
              iconType="userAvatar"
              color={"#D3DAE6"}
            />
            <EuiText style={{ marginLeft: "1rem" }}>
              <div style={{ display: "flex" }}>
                <p style={{ fontWeight: "bold", marginRight: "0.5em" }}>
                  Mensajero:{" "}
                </p>
                <Popover
                  isPopoverOpen={isPopoverOpen}
                  closePopover={() => setPopoverOpen(!isPopoverOpen)}
                  button={
                    <EuiLink onClick={() => setPopoverOpen(!isPopoverOpen)}>
                      No asignado
                    </EuiLink>
                  }
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {children}
                  </div>
                </Popover>
              </div>
            </EuiText>
          </EuiPanel>
          <EuiSpacer />
        </>
      ) : (
        <>
          <EuiPanel style={{ display: "flex" }} color="subdued">
            <EuiAvatar
              size="xl"
              name="Cat"
              imageUrl="https://source.unsplash.com/64x64/?cat"
            />
            <div style={{ marginLeft: "1rem" }}>
              <SimpleList title={"Id: "} description={`${messenger.id}`} />
              <SimpleList
                title={"Mensajero: "}
                description={`${messenger.firstName} ${messenger.lastName}`}
              />
              <SimpleList
                title={"Télefono: "}
                description={`${messenger.phone}`}
              />
            </div>
          </EuiPanel>
          <EuiSpacer />
        </>
      )}
    </>
  );
};
