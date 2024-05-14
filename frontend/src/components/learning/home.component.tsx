import React, { useEffect, useState } from 'react';

import './home.component.css';
import { getAllStudySetsForUser } from '../../core/services/studyset.service';
import { Box, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { StudySet } from '../../core/model/studyset.model';

export const LearningHomeComponent: React.FC = (): React.ReactElement => {

    const [studySets, setStudySets] = useState<StudySet[]>([]);

    useEffect(() => {
        getAllStudySetsForUser().then(response => {
            if (response) {
                setStudySets(response.data)
            }
        })
    }, []);

    return (
        <div style={{ marginTop: '65px' }}>
            <div className='text-5xl pt-10 pb-5'>
                Welcome to the learning area!
            </div>
            <div className='text-xl'>
                Either create a new study set or continue learning an already create study set below:
            </div>
            <div className='flex flex-row px-10'>
                <div className='home-learning-box-round'>
                    Flash cards
                </div>
                <div className='home-learning-box-round'>
                    Multiple choice
                </div>
                <div className='home-learning-box-round'>
                    Picture puzzle
                </div>
            </div>
            <div className='text-4xl pt-10 pb-5'>
                Your on going and past study sets:
            </div>
            <div className='mx-10'>
                <Box sx={{ width: '100%' }}>
                    <TableContainer component={Paper} className="overflow-y-auto" style={{ maxHeight: '50vh' }}>
                        <Table sx={{ width: '100%' }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>State</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>ID</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {studySets.map((studySetItem, i) => (
                                    <TableRow key={i} sx={{ "&:last-child td, &:last-child th": { border: 0 }, }} >
                                        <TableCell align="left">
                                            {studySetItem.dateCreated}
                                        </TableCell>
                                        <TableCell align="left">
                                            {studySetItem.learnStatus}
                                        </TableCell>
                                        <TableCell align="left">
                                            {studySetItem.studyCycleType}
                                        </TableCell>
                                        <TableCell align="left" width="200px">
                                            {studySetItem._id}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </div>
        </div>
    );
}