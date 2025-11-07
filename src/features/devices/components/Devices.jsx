import * as React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
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
import '../style/Devices.css';

const initialRows = [
  { id: "a1f9e2d4-1234-4b5c-9876-abcdef123456", name: "Sensor A", deviceType: "Temperature", location: "Vancouver", gatewayId: "a0f1e2d3-b4c5-6789-0abc-def123456789" },
  { id: "b2e8c3f5-2345-4c6d-8765-bcdefa234567", name: "Sensor B", deviceType: "Humidity", location: "Toronto", gatewayId: "b1g2h3i4-c5d6-7890-1bcd-ef2345678901" },
  { id: "c3d7b4e6-3456-4d7e-7654-cdefab345678", name: "Sensor C", deviceType: "Pressure", location: "Montreal", gatewayId: "c2h3i4j5-d6e7-8901-2cde-f34567890123" },
  { id: "d4c6a5f7-4567-4e8f-6543-defabc456789", name: "Sensor D", deviceType: "Temperature", location: "Calgary", gatewayId: "d3i4j5k6-e7f8-9012-3def-456789012345" },
  { id: "e5b5d6a8-5678-4f9g-5432-efabcd567890", name: "Sensor E", deviceType: "Humidity", location: "Edmonton", gatewayId: "b1g2h3i4-c5d6-7890-1bcd-ef2345678901" },
  { id: "f6a4c7b9-6789-4g0h-4321-fabcde678901", name: "Sensor F", deviceType: "Pressure", location: "Ottawa", gatewayId: "c2h3i4j5-d6e7-8901-2cde-f34567890123" },
  { id: "07b3d8c0-7890-4h1i-3210-abcdef789012", name: "Sensor G", deviceType: "Temperature", location: "Quebec", gatewayId: "c2h3i4j5-d6e7-8901-2cde-f34567890123" },
  { id: "18c2e9d1-8901-4i2j-2109-bcdefa890123", name: "Sensor H", deviceType: "Humidity", location: "Halifax", gatewayId: "e4j5k6l7-f8g9-0123-4ef0-567890123456" },
  { id: "29d1f0e2-9012-4j3k-1098-cdefab901234", name: "Sensor I", deviceType: "Pressure", location: "Winnipeg", gatewayId: "d3i4j5k6-e7f8-9012-3def-456789012345" },
  { id: "3ae0g1f3-0123-4k4l-0987-defabc012345", name: "Sensor J", deviceType: "Temperature", location: "Saskatoon", gatewayId: "d3i4j5k6-e7f8-9012-3def-456789012345" },
];


function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;
  const deviceGridLabel = "Devices";

  const handleClick = () => {
    const id = uuidv4();
    setRows((oldRows) => [
      ...oldRows,
      { id, name: '', deviceType: '', location: '', gatewayId: '', isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <Toolbar className='deviceToolbar'>
      <Typography className='deviceTitle'>
          {deviceGridLabel}
        </Typography>
      <Tooltip title="Add record">
        <ToolbarButton onClick={handleClick}>
          <AddIcon fontSize="small" />
        </ToolbarButton>
      </Tooltip>
    </Toolbar>
  );
}


export default function Devices() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };
  
  const columns = [
    { field: 'id', headerName: 'ID', flex:0.7 },
    { field: 'name', headerName: 'Device name', flex:2, editable: true, minWidth:100 },
    { field: 'deviceType', headerName: 'Device type', flex:1, editable: true },
    { field: 'location', headerName: 'Location', flex:1, editable: true },
    { field: 'gatewayId', headerName: 'Gateway ID', flex:0.7, editable: true },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      flex:1,
      minWidth:100,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              color='inherit'
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
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
    
        <Box className="deviceContainer">
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
