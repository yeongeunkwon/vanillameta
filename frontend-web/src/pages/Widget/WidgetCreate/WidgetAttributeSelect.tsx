import React, { useEffect, useState } from 'react';
import { Grid, List, ListItem, ListItemText, styled, TextField } from '@mui/material';
import SelectForm from '@/components/form/SelectForm';
import SelectChipForm from '@/components/form/SelectChipForm';
import RadioForm from '@/components/form/RadioForm';
import CheckForm from '@/components/form/CheckForm';
import TextFieldForm from '@/components/form/TextFieldForm';
import ColorFieldForm from '@/components/form/ColorFieldForm';
import ReactECharts from 'echarts-for-react';
import WidgetBox from '@/components/widget/WidgetBox';
import { componentList, getComponent } from '@/data/component';
import chartData from '@/data/sample/chart.json';
import LineChartSetting from '@/widget/settings/LineChartSetting';

const StyledList = styled(List)({
  display: 'flex',
  flexWrap: 'wrap',
  '& .MuiListItemText-root': {
    width: '100%',
  },
  '& .MuiListItemText-primary': {
    mb: 1,
    textAlign: 'left',
    fontWeight: 500,
    fontSize: 14,
  },
  '& .MuiListItem-root': {
    display: 'flex',
    flexDirection: ' column',
    rowGap: 8,
    width: '100%',
    padding: '30px 0 30px',
  },
});

function WidgetAttributeSelect(props) {
  // const {
  //   register,
  //   watch,
  //   formState: { errors },
  //   control,
  // } = useForm();

  // console.log(watch('example'));

  const [userValue, setUserValue] = useState({
    widgetName: '',
    xField: '',
    yField: '',
    value1: '',
    value2: '',
    value3: '',
    value4: '',
    value5: '',
    value6: [],
    value7: [],
    value8: [],
    value9: false,
    value10: '',
    value11: '',
    value12: '',
  });

  const [widgetOption, setWidgetOption] = useState({
    xField: '',
    yField: '',
    yField1: '',
  });

  const [widgetType, setWidgetType] = useState('lineChart');
  const [options, setOptions] = useState(null);

  useEffect(() => {
    setOptions(makeWidgetOption());
  }, [widgetOption]);

  const makeWidgetOption = () => {
    let newOption = {};
    switch (widgetType) {
      case 'lineChart':
        newOption = {
          grid: { top: 8, right: 8, bottom: 24, left: 36 },
          xAxis: {
            type: 'category',
            data: chartData.map(item => item[widgetOption.xField]),
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: chartData.map(item => item[widgetOption.yField]),
              type: 'line',
              smooth: true,
            },
            {
              data: chartData.map(item => item[widgetOption.yField1]),
              type: 'line',
              smooth: true,
            },
          ],
          tooltip: {
            trigger: 'axis',
          },
        };
        break;
    }
    return newOption;
  };

  const handleChange = newOption => {
    setWidgetOption(newOption);

    props.onUpdate(userValue);
  };

  const handleUpdate = enteredData => {
    setUserValue(prevState => ({ ...prevState, ...enteredData }));
  };

  // const { control, handleSubmit } = useForm({
  //   defaultValues: {
  //     firstName: '',
  //     select: {},
  //   },
  // });
  // const onSubmit = data => {
  //   console.log('data: ', data);
  // };

  return (
    <Grid
      container
      component="form"
      // onSubmit={handleSubmit(onSubmit)}
      id="widgetAttribute"
      sx={{ justifyContent: { xs: 'center', md: 'space-between' } }}
    >
      <Grid item xs={12} md={8.5}>
        <WidgetBox>{options && <ReactECharts option={options} style={{ height: '100%', width: '100%' }} />}</WidgetBox>
      </Grid>
      <LineChartSetting option={widgetOption} setOptions={setWidgetOption} />
    </Grid>
  );
}

export default WidgetAttributeSelect;
