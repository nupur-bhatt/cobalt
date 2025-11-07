import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { 
  DataGrid, 
  GridRowModes, 
  GridActionsCellItem, 
  Toolbar,
  ToolbarButton
} from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import '../style/Incidents.css';

const initialRows = [
  { id: "f47ac10b-58cc-4372-a567-0e02b2c3d471", deviceName: "Sensor A", type: "Sensor Failure", severity: "High", status: "Pending", location: "Vancouver", timestamp: "2025-10-23T12:00:00Z" },
  { id: "9c858901-8a57-4791-81fe-4c455b099bca", deviceName: "Sensor B", type: "Low Battery", severity: "Medium", status: "Resolved", location: "Toronto", timestamp: "2025-10-23T13:00:00Z" },
  { id: "5b1f63f0-bd7c-4c0e-9c7a-8e9f1a2b3c4e", deviceName: "Sensor C", type: "Communication Error", severity: "High", status: "Pending", location: "Montreal", timestamp: "2025-10-23T14:00:00Z" },
  { id: "2d4e6f8a-1b2c-3d4e-5f6a-7b8c9d0e1f2b", deviceName: "Sensor D", type: "Calibration Needed", severity: "Low", status: "Pending", location: "Calgary", timestamp: "2025-10-23T15:00:00Z" },
  { id: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p8", deviceName: "Sensor E", type: "Power Failure", severity: "High", status: "Resolved", location: "Edmonton", timestamp: "2025-10-23T16:00:00Z" },
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
  const incidentGridLabel = "Incidents";

  const handleClick = () => {
    const id = uuidv4();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        deviceName: '',
        type: '',
        severity: '',
        status: '',
        location: '',
        timestamp: '',
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'deviceName' },
    }));
  };

  return (
    <Toolbar className='incidentToolbar'>
      <Typography className='incidentTitle'>
        {incidentGridLabel}
      </Typography>
      <Tooltip title="Add record">
        <ToolbarButton onClick={handleClick}>
          <AddIcon fontSize="small" />
        </ToolbarButton>
      </Tooltip>
    </Toolbar>
  );
}

export default function Incidents() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === 'rowFocusOut') event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () =>
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });

  const handleSaveClick = (id) => () =>
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });

  const handleDeleteClick = (id) => () =>
    setRows(rows.filter((row) => row.id !== id));

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) setRows(rows.filter((row) => row.id !== id));
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newModel) => setRowModesModel(newModel);

  const columns = [
    { field: 'id', headerName: 'Incident ID', flex:0.7},
    { field: 'deviceName', headerName: 'Device Name', editable: true, flex:1, minWidth:150 },
    { field: 'type', headerName: 'Type', editable: true, flex:1 },
    { field: 'severity', headerName: 'Severity',  editable: true, flex:1 },
    { field: 'status', headerName: 'Status',  editable: true, flex:1 },
    { field: 'location', headerName: 'Location',  editable: true, flex:1 },
    { field: 'timestamp', headerName: 'Timestamp',  editable: true, flex:1 },
    {
      field: 'actions',
      type: 'actions',
      flex:0.5,
      minWidth: 100,
      headerName: 'Actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }
        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (

        <Box className="incidentContainer">
          <DataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            checkboxSelection
            disableRowSelectionOnClick
            slots={{ toolbar: EditToolbar }}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
            showToolbar
          />
        </Box>
       
  );
}
