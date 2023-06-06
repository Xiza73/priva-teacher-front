import Paper from "@mui/material/Paper";
import {
  EditingState,
  IntegratedEditing,
  ViewState,
} from "@devexpress/dx-react-scheduler";
import {
  AppointmentForm,
  Appointments,
  AppointmentTooltip,
  ConfirmationDialog,
  DateNavigator,
  Resources,
  Scheduler,
  TodayButton,
  Toolbar,
  WeekView,
} from "@devexpress/dx-react-scheduler-material-ui";
import { useState } from "react";

interface DemoProps {}

type Appointment = any;

const resourcesData = [
  {
    text: "Room 101",
    id: 1,
  },
  {
    text: "Room 102",
    id: 2,
  },
  {
    text: "Room 103",
    id: 3,
  },
  {
    text: "Meeting room",
    id: 4,
  },
  {
    text: "Conference hall",
    id: 5,
  },
];

const teachers = [
  {
    text: "Andrew Glover",
    id: 1,
  },
  {
    text: "Arnie Schwartz",
    id: 2,
  },
  {
    text: "John Heart",
    id: 3,
  },
];

export const Schedule: React.FC<DemoProps> = ({}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [data, setData] = useState<Appointment[]>([]);
  const [resources] = useState<any[]>([
    {
      fieldName: "roomId",
      title: "Room",
      instances: resourcesData,
    },
    {
      fieldName: "teacherId",
      title: "Teacher",
      instances: teachers,
    },
  ]);

  const addAppointment = (appointment: Appointment) => {
    const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
    setData([...data, { id: startingAddedId, ...appointment }]);
  };

  const changeAppointment = (appointment: Appointment) => {
    setData(
      data.map((app) =>
        appointment[app.id] ? { ...app, ...appointment[app.id] } : app
      )
    );
  };

  const deleteAppointment = (appointment: number) => {
    setData(data.filter((app) => app.id !== appointment));
  };

  const commitChanges = ({
    added,
    changed,
    deleted,
  }: {
    added: Appointment;
    changed: Appointment;
    deleted: number;
  }) => {
    if (added) return addAppointment(added);
    if (changed) return changeAppointment(changed);
    return deleteAppointment(deleted);
  };

  const LabelComponent = (props: { text: string; [key: string]: any }) => {
    if (props.text === "Details")
      return <AppointmentForm.Label {...props} text="Address" />;
    return null;
  };

  return (
    <Paper>
      <Scheduler data={data}>
        <ViewState
          currentDate={currentDate}
          onCurrentDateChange={setCurrentDate}
        />
        <WeekView
          startDayHour={7}
          endDayHour={22}
          cellDuration={60}
          excludedDays={[0, 6]}
        />
        <Toolbar />
        <EditingState onCommitChanges={commitChanges} />
        <IntegratedEditing />
        <ConfirmationDialog />
        <DateNavigator />
        <TodayButton />
        <Appointments />
        <AppointmentTooltip showCloseButton showOpenButton />
        <AppointmentForm labelComponent={LabelComponent} />
        <Resources data={resources} mainResourceName="roomId" />
      </Scheduler>
    </Paper>
  );
};
