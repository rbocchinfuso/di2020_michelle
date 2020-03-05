FROM continuumio/miniconda3
RUN mkdir -p /app
COPY ./static /app/static
COPY ./templates /app/templates
ADD ./dbsetup.py /app
ADD ./app.py /app
ADD ./run_wrapper.sh /app
RUN chmod 755 /app/*.py
RUN chmod 755 /app/*.sh
ADD ./requirements.txt /app
WORKDIR /app
RUN pip install -r requirements.txt
EXPOSE 5000
#ENTRYPOINT ["python"]
CMD ["./run_wrapper.sh"]